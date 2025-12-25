import fs from "fs";

// アプリを作成
const createApp = async (
  appName: string,
  baseUrl: string,
  auth: string,
  spaceId?: string,
  threadId?: string
) => {
  const body =
    spaceId && threadId
      ? JSON.stringify({
          name: appName,
          space: spaceId,
          thread: threadId,
        })
      : JSON.stringify({
          name: appName,
        });
  const response = await fetch(`${baseUrl}/k/v1/preview/app.json`, {
    method: "POST",
    headers: {
      "X-Cybozu-Authorization": auth,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create app: ${response.status} ${error}`);
  }

  const data = await response.json();
  console.log("Created app ID:", data.app);
  return data.app;
};

// フィールドを追加
const addFields = async (
  appId: string,
  properties: any,
  baseUrl: string,
  auth: string
) => {
  const response = await fetch(`${baseUrl}/k/v1/preview/app/form/fields.json`, {
    method: "POST",
    headers: {
      "X-Cybozu-Authorization": auth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      app: appId,
      properties: properties,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to add fields: ${response.status} ${error}`);
  }

  console.log("Fields added successfully");
};

// アプリを本番環境にデプロイ
const deployApp = async (appId: string, baseUrl: string, auth: string) => {
  const response = await fetch(`${baseUrl}/k/v1/preview/app/deploy.json`, {
    method: "POST",
    headers: {
      "X-Cybozu-Authorization": auth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apps: [{ app: appId }],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to deploy app: ${response.status} ${error}`);
  }

  console.log("App deployed successfully");
};

(async () => {
  try {
    const baseUrl = process.env.BASE_URL;
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const spaceId = process.env.SPACE_ID;
    const threadId = process.env.THREAD_ID;

    // 引数でアプリ名, properties.jsonのfilename
    const appName = process.argv[2];
    const propertiesFileName = process.argv[3];

    const propertiesPath = `./scripts/kintone-app/${propertiesFileName}.json`;

    if (!baseUrl || !username || !password) {
      throw new Error("Environment variables are not set");
    }

    const auth = Buffer.from(`${username}:${password}`).toString("base64");

    const appId = await createApp(appName, baseUrl, auth, spaceId, threadId);
    const properties = JSON.parse(fs.readFileSync(propertiesPath, "utf8"));
    await addFields(appId, properties, baseUrl, auth);
    await deployApp(appId, baseUrl, auth);
    console.log(`\nApp created successfully! App ID: ${appId}`);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
})();

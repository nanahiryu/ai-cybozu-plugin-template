import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const entries = {
  desktop: resolve(__dirname, "src/pages/desktop/index.ts"),
  config: resolve(__dirname, "src/pages/config/index.ts"),
};

// 各エントリーポイントを単一ファイルにバンドルするための設定を生成
const createBuildConfig = (
  name: string,
  entry: string
): UserConfig["build"] => ({
  outDir: "plugin/js",
  emptyOutDir: false,
  cssCodeSplit: false,
  rollupOptions: {
    input: { [name]: entry },
    output: {
      entryFileNames: "[name].js",
      format: "iife",
      inlineDynamicImports: true,
    },
  },
  sourcemap: false,
});

// ビルドターゲットを環境変数で切り替え
const target = process.env.BUILD_TARGET as keyof typeof entries | undefined;

export default defineConfig({
  plugins: [react()],
  build: target
    ? createBuildConfig(target, entries[target])
    : {
        outDir: "plugin/js",
        emptyOutDir: true,
        cssCodeSplit: false,
        rollupOptions: {
          input: entries,
          output: {
            entryFileNames: "[name].js",
            format: "es",
          },
        },
        sourcemap: false,
      },
});

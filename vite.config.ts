import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'plugin/js',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        desktop: resolve(__dirname, 'src/pages/desktop/index.ts'),
        config: resolve(__dirname, 'src/pages/config/index.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        // kintone環境での動作を考慮してフォーマットを調整
        // IIFEやUMDが理想だが、複数エントリーポイントの場合は手動設定が必要な場合がある
        // ここでは標準的な設定で出力し、必要に応じてラップする
        format: 'es', 
      },
    },
    // ソースマップがあるとデバッグしやすい
    sourcemap: true,
  },
  // kintoneのグローバル変数などはここで定義する必要はない（外部として扱うため）
});

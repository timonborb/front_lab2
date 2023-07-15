const path = require('path')
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin');


module.exports = {
  mode: "production",
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/template.html'), // шаблон
      filename: 'template.html', // ім'я вихідного файлу
    }),
    ...glob.sync('./src/pages/**/*.html').map((filePath) => {
      const fileName = path.basename(filePath);
      return new HtmlWebpackPlugin({
        filename: fileName,
        template: filePath,
        inject: true,
        chunks: ['main'], // Вказати потрібні чанки, якщо використовуєте
      });
    })
  ],

} 
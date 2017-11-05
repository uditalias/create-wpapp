const { Transform } = require("stream");

module.exports = function (params) {

    const stream = Transform({ objectMode: true });
    const KEY = "<@=MODULE.RULES=@>";

    stream._transform = function (file, encoding, cb) {

        file = file.toString();

        let rules = [];

        if (params.type === "typescript") {

            const ext = params.use_react ? "tsx" : "ts";

            rules.push(`{
                test: /\.${ext}?$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            }`);

        } else if (params.type === "javascript") {

            rules.push(`{
                test: /\.js?$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }`);

        }

        if (params.use_css) {

            let ext = "css";

            const loaders = [
                "css-loader"
            ];

            if (params.use_scss) {
                ext = "scss"
                loaders.push("sass-loader");
            }

            rules.push(`{
                test: /\.${ext}$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ${JSON.stringify(loaders)}
                })
            }`);

        }

        this.push(file.replace(new RegExp(KEY, "g"), `[${rules.join(", ")}]`));

        cb();
    }

    return stream;
}
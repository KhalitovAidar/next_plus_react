module.exports = {
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/:path*',
	// 			destination: 'http://localhost:8080/:path*',
	// 		},
	// 	]
	// },
	images: {
		domains: ['courses-top.ru', 'old-images.hb.ru-msk.vkcs.cloud']
	},
	webpack(config, options) {
		config.module.rules.push({
			loader: '@svgr/webpack',
			issuer: /\.[jt]sx?$/,
			options: {
				prettier: false,
				svgo: true,
				svgoConfig: {
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: { removeViewBox: false },
							},
						},
					],
				},
				titleProp: true,
			},
			test: /\.svg$/,
		});

		return config;
	},
};
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        config.module.rules.push({
          test: /\.(glsl|vs|fs|vert|frag)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'raw-loader',
            },
            {
              loader: 'glslify-loader',
            },
          ],
        });
    
        return config;
      },
};

export default nextConfig;

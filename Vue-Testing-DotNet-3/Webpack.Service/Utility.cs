using System;
using System.Diagnostics;

namespace Webpack.Service
{
    public class Utility
    {
        /// <summary>
        /// executionPath => the file path for WebPack.Service.exe;
        /// configName => the real name for webpack.config.js;
        /// configPath => the file path for webpack.config.js;
        /// </summary>
        /// <param name="configName"></param>
        /// <param name="configPath"></param>
        /// <param name="executionPath"></param>
        public static void StartWebPackDevServer(string executionPath, string configName = "", string configPath = "")
        {
            if (executionPath == string.Empty)
            {
                throw new Exception("please indicate the file path for executionPath");
            }

            var webpackService = new Process();

            webpackService.StartInfo = new ProcessStartInfo
            {
                FileName = "Webpack.Service.exe",
                Arguments = $"{configName} {configPath}".Trim(),
                WorkingDirectory = executionPath,
                CreateNoWindow = false
            };

            try
            {
                webpackService.Start();
            }
            finally
            {
                webpackService.Close();
            }
        }
    }
}

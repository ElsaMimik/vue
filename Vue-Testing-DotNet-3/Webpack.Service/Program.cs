using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Webpack.Service
{
    class Program
    {
        static void Main(string[] args)
        {
            var processes = Process.GetProcessesByName("Webpack.Service");
            if (processes.Count() > 1)
            {
                Environment.Exit(0);
            }

            var folderPath = string.Empty;
            var configName = "webpack.config.js";

            if (args.Count() > 0 && args[0] != string.Empty)
            {
                configName = args[0];
            }

            if (args.Count() > 1 && args[1] != string.Empty)
            {
                folderPath = args[1];
            }

            var webpack = new Process();
            webpack.StartInfo = new ProcessStartInfo
            {
                FileName = "cmd.exe",
                Arguments = $"/c webpack-dev-server --config {configName}",
                UseShellExecute = false,
                CreateNoWindow = false
            };

            if (folderPath != string.Empty)
            {
                webpack.StartInfo.WorkingDirectory = folderPath;
            }

            try
            {
                webpack.Start();
            }
            finally
            {
                webpack.Close();
            }

            Console.ReadLine();
        }
    }
}

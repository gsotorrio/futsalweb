using System;
using System.Configuration;

namespace Futsalweb.CrossLayer.Settings
{
    public static class AppSettings
    {
        public static string ConnectionString { get; } = string.Format(ConfigurationManager.ConnectionStrings["FutsalwebDB"].ConnectionString, Environment.MachineName);
    }
}

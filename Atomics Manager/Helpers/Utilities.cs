﻿// ====================================================
// More Templates: https://www.ebenmonney.com/templates
// Email: support@ebenmonney.com
// ====================================================

using AspNet.Security.OpenIdConnect.Primitives;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Atomics_Manager.Helpers
{
    public static class Utilities
    {
        static ILoggerFactory _loggerFactory;


        public static void ConfigureLogger(ILoggerFactory loggerFactory)
        {
            _loggerFactory = loggerFactory;
        }


        public static ILogger CreateLogger<T>()
        {
            if (_loggerFactory == null)
            {
                throw new InvalidOperationException($"{nameof(ILogger)} is not configured. {nameof(ConfigureLogger)} must be called before use");
                //_loggerFactory = new LoggerFactory().AddConsole().AddDebug();
            }

            return _loggerFactory.CreateLogger<T>();
        }


        public static void QuickLog(string text, string filename)
        {
            string dirPath = Path.GetDirectoryName(filename);

            if (!Directory.Exists(dirPath))
                Directory.CreateDirectory(dirPath);

            using (StreamWriter writer = File.AppendText(filename))
            {
                writer.WriteLine($"{DateTime.Now} - {text}");
            }
        }



        public static string GetUserId(ClaimsPrincipal user)
        {
            return user.FindFirst(OpenIdConnectConstants.Claims.Subject)?.Value?.Trim();
        }

        public static string GetUserName(ClaimsPrincipal user)
        {
            return user.FindFirst(OpenIdConnectConstants.Claims.Subject)?.Value?.Trim();
        }

        public static string[] GetRoles(ClaimsPrincipal identity)
        {
            return identity.Claims
                .Where(c => c.Type == OpenIdConnectConstants.Claims.Role)
                .Select(c => c.Value)
                .ToArray();
        }

        private static readonly IDictionary<string, IAttachmentType> mimeMap =
     new Dictionary<string, IAttachmentType>(StringComparer.OrdinalIgnoreCase)
     {
            { "IVBOR", AttachmentType.Photo },
            { "/9J/4", AttachmentType.Photo },
            { "AAAAF", AttachmentType.Video },
            { "JVBER", AttachmentType.Document }
     };
        public static IAttachmentType GetMimeType(this string value)
        {
            IAttachmentType result;

            return string.IsNullOrEmpty(value)
                ? AttachmentType.UnknownMime
                : (mimeMap.TryGetValue(value.Substring(0, 5), out result) ? result : AttachmentType.Unknown);
        }
    }
}

namespace server.Models
{
    using System;

    public class ModelUtility
    {
        public const string DateFormat = "dd/MM/yyyy";

        public static DateTime GetDateTimeFromUnixTime(Int64 time)
        {
            return new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc).AddMilliseconds(time);
        }
    }
}
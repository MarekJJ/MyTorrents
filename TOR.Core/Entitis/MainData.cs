using System;

namespace TOR.Core.Entitis
{
    public class MainData : Entity<int>
    {
        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Tor { get; set; }

        public int Likes { get; set; }

        public int Dislikes { get; set; }

        public string Desctiption { get; set; }

        /// <summary>
        /// ////////////////////
        /// </summary>

        public int StatusId { get; set; }

        public virtual Status Status { get; set; }

        public int TypeId { get; set; }

        public virtual Type Type { get; set; }
    }
}

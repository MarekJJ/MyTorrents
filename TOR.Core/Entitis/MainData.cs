using System;

namespace TOR.Core.Entitis
{
    public class MainData : Entity<int>
    {
        public string Title { get; set; }

        public DateTime Date { get; set; }

        public string Torrent { get; set; }

        public int Likes { get; set; }

        public int Dislikes { get; set; }

        public string Desctiption { get; set; }

        public int StatusId { get; set; }

        public Status Status { get; set; }

        public int TypeId { get; set; }

        public Type Type { get; set; }
    }
}

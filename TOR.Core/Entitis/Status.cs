using System.Collections.Generic;

namespace TOR.Core.Entitis
{
    public class Status : Entity<int>
    {
        public string Code { get; set; }

        public virtual ICollection<MainData> MainData { get; set; } = new List<MainData>();
    }
}

using System.Collections.Generic;

namespace TOR.Core.Entitis
{
    public class Type : Entity<int>
    {
        public string Code { get; set; }

        public int SubTypeId { get; set; }

        public SubType SubType { get; set; }

        public virtual ICollection<MainData> MainData { get; set; } = new List<MainData>();

    }
}

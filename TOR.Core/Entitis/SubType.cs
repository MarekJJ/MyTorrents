using System.Collections.Generic;

namespace TOR.Core.Entitis
{
    public class SubType : Entity<int>
    {
        public string Code { get; set; }

        public virtual ICollection<Type> Type { get; set; } = new List<Type>();
    }
}

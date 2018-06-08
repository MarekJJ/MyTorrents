using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TOR.Core.Entitis;

namespace TOR.DataAccess.EntitisConfigurations
{
   public class SubTypeConfiguration : EntityTypeConfiguration<SubType>
    {
        public SubTypeConfiguration()
        {
            ToTable("SubType");

            HasKey(x => x.Id);

            Property(x => x.Code).IsRequired();

            HasMany(x => x.Type).WithOptional(x => x.SubType).HasForeignKey(x => x.SubTypeId);
        }
    }
}

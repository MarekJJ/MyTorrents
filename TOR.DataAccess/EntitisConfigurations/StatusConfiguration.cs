using System.Data.Entity.ModelConfiguration;
using TOR.Core.Entitis;

namespace TOR.DataAccess.EntitisConfigurations
{
    class StatusConfiguration : EntityTypeConfiguration<Status>
    {
        public StatusConfiguration()
        {
            ToTable("Status");

            HasKey(x => x.Id);

            Property(x => x.Code).IsRequired();

            // HasMany(x => x.Type).WithOptional(x => x.SubType).HasForeignKey(x => x.SubTypeId);
        }
    }
}

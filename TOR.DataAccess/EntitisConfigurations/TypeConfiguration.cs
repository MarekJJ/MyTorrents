using System.Data.Entity.ModelConfiguration;
using TOR.Core.Entitis;

namespace TOR.DataAccess.EntitisConfigurations
{
    public class TypeConfiguration : EntityTypeConfiguration<Type>
    {
        public TypeConfiguration()
        {
            ToTable("Type");

            HasKey(x => x.Id);

            Property(x => x.Code).IsRequired();

            HasRequired(x => x.SubType).WithMany().HasForeignKey(x => x.SubTypeId);
            // HasMany(x => x.MainData).WithOptional(x => x.Type).HasForeignKey(x => x.TypeId);
        }
    }
}

using System.Data.Entity.ModelConfiguration;
using TOR.Core.Entitis;



namespace TOR.DataAccess.EntitisConfigurations
{
    class MainDataConfigurations : EntityTypeConfiguration<MainData>
    {
        public MainDataConfigurations()
        {
            ToTable("MainData");

            HasKey(x => x.Id);

            Property(x => x.Desctiption).IsRequired();
        }
    }
}

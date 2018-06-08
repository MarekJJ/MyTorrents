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

            Property(x => x.Title).IsRequired();
            Property(x => x.Date).IsRequired();
            Property(x => x.Torrent).IsRequired();
            Property(x => x.Likes).IsOptional();
            Property(x => x.Dislikes).IsOptional();
            Property(x => x.Desctiption).IsRequired();

            HasRequired(x => x.Status).WithMany().HasForeignKey(x => x.StatusId);
            HasRequired(x => x.Type).WithMany().HasForeignKey(x => x.TypeId);

        }
    }
}

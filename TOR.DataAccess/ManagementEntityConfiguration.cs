using System.Data.Entity.ModelConfiguration.Configuration;
using TOR.DataAccess.EntitisConfigurations;

namespace TOR.DataAccess
{
    public static class ManagementEntityConfiguration
    {
        public static void ManagementEntities(this ConfigurationRegistrar configurationRegistrar)
        {
            configurationRegistrar.Add(new MainDataConfigurations());// rejestruje encje dla migracji, MainDataConfigurations() to jest jedna z encji

        }
    }

}

using Microsoft.Practices.Unity;

namespace WebSite.App_Start
{
    public static class MvcUnityContainerExtensions
    {
        //public static void RegisterTypePerRequest<TFrom, TTo>(this IUnityContainer unityContainer)
        //    where TTo : TFrom
        //{
        //    unityContainer.RegisterType<TFrom, TTo>(new PerRequestLifetimeManager());
        //}

        public static void RegisterTypeWithDefaultConstructorPerRequest<TFrom, TTo>(this IUnityContainer unityContainer)  //notka to jest rozszerzenie dla public static void RegisterTypes(IUnityContainer container) znajdujące sie w unityConfig
            where TTo : TFrom
        {
            unityContainer.RegisterType<TFrom, TTo>(new PerRequestLifetimeManager(), new InjectionConstructor());
        }

        //public static void RegisterTypeWithDefaultConstructorPerRequest<T>(this IUnityContainer unityContainer)
        //{
        //    unityContainer.RegisterType<T>(new PerRequestLifetimeManager(), new InjectionConstructor());
        //}
    }
}
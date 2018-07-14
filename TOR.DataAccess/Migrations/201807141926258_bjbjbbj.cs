namespace TOR.DataAccess.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class bjbjbbj : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MainData",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(nullable: false),
                        Date = c.DateTime(nullable: false, precision: 7, storeType: "datetime2"),
                        Tor = c.String(nullable: false),
                        Likes = c.Int(),
                        Dislikes = c.Int(),
                        Desctiption = c.String(nullable: false),
                        StatusId = c.Int(nullable: false),
                        TypeId = c.Int(nullable: false),
                        Status_Id = c.Int(),
                        Type_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Status", t => t.Status_Id)
                .ForeignKey("dbo.Status", t => t.StatusId)
                .ForeignKey("dbo.Type", t => t.Type_Id)
                .ForeignKey("dbo.Type", t => t.TypeId)
                .Index(t => t.StatusId)
                .Index(t => t.TypeId)
                .Index(t => t.Status_Id)
                .Index(t => t.Type_Id);
            
            CreateTable(
                "dbo.Status",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Code = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Type",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Code = c.String(nullable: false),
                        SubTypeId = c.Int(nullable: false),
                        SubType_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.SubType", t => t.SubType_Id)
                .ForeignKey("dbo.SubType", t => t.SubTypeId)
                .Index(t => t.SubTypeId)
                .Index(t => t.SubType_Id);
            
            CreateTable(
                "dbo.SubType",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Code = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.MainData", "TypeId", "dbo.Type");
            DropForeignKey("dbo.Type", "SubTypeId", "dbo.SubType");
            DropForeignKey("dbo.Type", "SubType_Id", "dbo.SubType");
            DropForeignKey("dbo.MainData", "Type_Id", "dbo.Type");
            DropForeignKey("dbo.MainData", "StatusId", "dbo.Status");
            DropForeignKey("dbo.MainData", "Status_Id", "dbo.Status");
            DropIndex("dbo.Type", new[] { "SubType_Id" });
            DropIndex("dbo.Type", new[] { "SubTypeId" });
            DropIndex("dbo.MainData", new[] { "Type_Id" });
            DropIndex("dbo.MainData", new[] { "Status_Id" });
            DropIndex("dbo.MainData", new[] { "TypeId" });
            DropIndex("dbo.MainData", new[] { "StatusId" });
            DropTable("dbo.SubType");
            DropTable("dbo.Type");
            DropTable("dbo.Status");
            DropTable("dbo.MainData");
        }
    }
}

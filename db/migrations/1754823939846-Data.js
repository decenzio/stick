module.exports = class Data1754823939846 {
    name = 'Data1754823939846'

    async up(db) {
        await db.query(`ALTER TABLE "nftaa_entity" ADD "nft_id" character varying`)
        await db.query(`ALTER TABLE "nftaa_entity" ADD CONSTRAINT "UQ_63589ef4c2d3320e048f73123bc" UNIQUE ("nft_id")`)
        await db.query(`CREATE UNIQUE INDEX "IDX_63589ef4c2d3320e048f73123b" ON "nftaa_entity" ("nft_id") `)
        await db.query(`ALTER TABLE "nftaa_entity" ADD CONSTRAINT "FK_63589ef4c2d3320e048f73123bc" FOREIGN KEY ("nft_id") REFERENCES "nft_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "nftaa_entity" DROP COLUMN "nft_id"`)
        await db.query(`ALTER TABLE "nftaa_entity" DROP CONSTRAINT "UQ_63589ef4c2d3320e048f73123bc"`)
        await db.query(`DROP INDEX "public"."IDX_63589ef4c2d3320e048f73123b"`)
        await db.query(`ALTER TABLE "nftaa_entity" DROP CONSTRAINT "FK_63589ef4c2d3320e048f73123bc"`)
    }
}

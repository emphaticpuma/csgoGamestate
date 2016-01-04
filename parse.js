// we parse the data on the server so it is faster/lighter on the front end
// the way the data comes from csgo, it its mashed up, so it is easier to fit it on the server
// ex. weapons are ordered based on how you buy them :-(

var fs = require("fs");

var weaponPrefix = "weapon_";

var imgUrl = {
	weapon_c75za: "http://vignette3.wikia.nocookie.net/cswikia/images/c/cf/C75a_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_deagle: "http://vignette2.wikia.nocookie.net/cswikia/images/7/7d/Deagle_hud_go.png/revision/latest/scale-to-height-down/100",
	weapon_elite: "http://vignette2.wikia.nocookie.net/cswikia/images/8/82/Elite_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_fiveseven: "http://vignette2.wikia.nocookie.net/cswikia/images/9/9c/Fiveseven_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_glock: "http://vignette2.wikia.nocookie.net/cswikia/images/3/33/Glock18_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_p250: "http://vignette2.wikia.nocookie.net/cswikia/images/5/57/P250_hud.png/revision/latest/scale-to-height-down/100",
	weapon_hkp2000: "http://vignette1.wikia.nocookie.net/cswikia/images/6/67/Hkp2000_hud.png/revision/latest/scale-to-height-down/100",
	weapon_tec9: "http://vignette3.wikia.nocookie.net/cswikia/images/5/55/Tec9_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_usp_silencer: "http://vignette2.wikia.nocookie.net/cswikia/images/7/73/Usps_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_mag7: "http://vignette2.wikia.nocookie.net/cswikia/images/2/2e/Mag7_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_revolver: "http://vignette2.wikia.nocookie.net/cswikia/images/7/7d/Deagle_hud_go.png/revision/latest/scale-to-height-down/100",
	weapon_nova: "http://vignette4.wikia.nocookie.net/cswikia/images/c/c8/Nova_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_sawedoff: "http://vignette1.wikia.nocookie.net/cswikia/images/9/94/Sawedoff_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_xm1014: "http://vignette2.wikia.nocookie.net/cswikia/images/a/ad/Xm1014_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_mac10: "http://vignette2.wikia.nocookie.net/cswikia/images/f/f7/Mac10_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_mp7: "http://vignette4.wikia.nocookie.net/cswikia/images/8/8d/Mp7_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_mp9: "http://vignette2.wikia.nocookie.net/cswikia/images/1/14/Mp9_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_p90: "http://vignette3.wikia.nocookie.net/cswikia/images/b/bd/P90_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_bizon: "http://vignette1.wikia.nocookie.net/cswikia/images/d/d5/Bizon_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_ump45: "http://vignette3.wikia.nocookie.net/cswikia/images/c/c4/Ump45_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_ak47: "http://vignette1.wikia.nocookie.net/cswikia/images/7/76/Ak47_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_aug: "http://vignette2.wikia.nocookie.net/cswikia/images/6/6f/Aug_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_famas: "http://vignette2.wikia.nocookie.net/cswikia/images/8/8f/Famas_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_galilar: "http://vignette1.wikia.nocookie.net/cswikia/images/4/4a/Galilar_hud.png/revision/latest/scale-to-height-down/100",
	weapon_m4a1_silencer: "http://vignette3.wikia.nocookie.net/cswikia/images/4/4f/M4a1s_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_m4a1: "http://vignette2.wikia.nocookie.net/cswikia/images/d/d9/M4a4_hud.png/revision/latest/scale-to-height-down/100",
	weapon_sg556: "http://vignette1.wikia.nocookie.net/cswikia/images/9/9b/Sg556_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_awp: "http://vignette3.wikia.nocookie.net/cswikia/images/e/eb/Awp_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_g3sg1: "http://vignette4.wikia.nocookie.net/cswikia/images/4/4a/G3sg1_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_ssg08: "http://vignette4.wikia.nocookie.net/cswikia/images/3/3c/Ssg08_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_scar20: "http://vignette4.wikia.nocookie.net/cswikia/images/c/c9/Scar20_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_m249: "http://vignette2.wikia.nocookie.net/cswikia/images/e/ea/M249_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_negev: "http://vignette2.wikia.nocookie.net/cswikia/images/b/be/Negev_hud.png/revision/latest/scale-to-height-down/100",

	weapon_c4: "http://vignette1.wikia.nocookie.net/cswikia/images/f/fc/C4_ticking_source.png/revision/latest/scale-to-height-down/100",
	weapon_hegrenade: "http://vignette1.wikia.nocookie.net/cswikia/images/6/60/Ammo_hegrenade_css.png/revision/latest/scale-to-height-down/100",
	weapon_molotov: "http://vignette3.wikia.nocookie.net/cswikia/images/f/fc/Molotov_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_flashbang: "http://vignette2.wikia.nocookie.net/cswikia/images/a/af/Flashbang_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_decoy: "http://vignette1.wikia.nocookie.net/cswikia/images/7/78/Decoy_hud.png/revision/latest/scale-to-height-down/100",
	weapon_smokegrenade: "http://vignette3.wikia.nocookie.net/cswikia/images/4/48/Smokegrenade_hud_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_incgrenade: "http://vignette2.wikia.nocookie.net/cswikia/images/4/45/Incgrenade_hud_csgo.png/revision/latest/scale-to-height-down/100",

	weapon_knife: "http://vignette2.wikia.nocookie.net/cswikia/images/4/4b/Knife_ct_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_t: "http://vignette3.wikia.nocookie.net/cswikia/images/2/28/Knife_t_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_bayonet: "http://vignette2.wikia.nocookie.net/cswikia/images/2/28/Csgo_knife_Bayonet.png/revision/latest/scale-to-height-down/100",
	weapon_knife_butterfly: "http://vignette2.wikia.nocookie.net/cswikia/images/d/df/Knife_butterfly_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_falchion: "http://vignette4.wikia.nocookie.net/cswikia/images/7/7e/Falchion_Knife_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_flip: "http://vignette3.wikia.nocookie.net/cswikia/images/a/a4/Knife_flip_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_gut: "http://vignette2.wikia.nocookie.net/cswikia/images/f/ff/Knife_gut_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_tactical: "http://vignette2.wikia.nocookie.net/cswikia/images/5/53/Knife_hustman_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_karambit: "http://vignette4.wikia.nocookie.net/cswikia/images/5/57/Knife_karambit_hud_outline_csgo.png/revision/latest/scale-to-height-down/100",
	weapon_knife_m9_bayonet: "http://vignette4.wikia.nocookie.net/cswikia/images/d/d3/Csgo_knife_M9_Bayonet.png/revision/latest/scale-to-height-down/100",
	weapon_knife_shadow_dagger: "http://vignette4.wikia.nocookie.net/cswikia/images/f/f1/Knife_push_hud_outline_csgo.png/revision/latest/scale-to-height-down/100"
};

// I should be getting all this data from items_game_cdn.txt in the game files,
// so it will update when the game adds new skins

var skinUrl = {
	"weapon_ak47_am_bamboo_jungle": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_am_bamboo_jungle_light_large.98cd023e9d2207ad765b600b281352cbc5009051.png",
	"weapon_ak47_aq_ak47_cartel": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_aq_ak47_cartel_light_large.2e7be9f4c7bda304f2a7c374260d95affca93f0b.png",
	"weapon_ak47_aq_oiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_aq_oiled_light_large.92c8d125e4e54758d37e946496030e9a18833b58.png",
	"weapon_ak47_cu_ak47_cobra": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak47_cobra_light_large.7494bfdf4855fd4e6a2dbd983ed0a243c80ef830.png",
	"weapon_ak47_cu_ak47_courage_alt": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak47_courage_alt_light_large.27e4e7d38dc2ce36ffe86bd6ec65d6f525751eaa.png",
	"weapon_ak47_cu_ak47_mastery": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak47_mastery_light_large.4305c0ba4b02ce531fc08c275fa6a9d87da2cf7e.png",
	"weapon_ak47_cu_ak47_point_disarray": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak47_point_disarray_light_large.ba0f6ccdcb917aa2bde2ef0312c57d763a61d341.png",
	"weapon_ak47_cu_ak47_rubber": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak47_rubber_light_large.5836c38d3037a5a1f90ffdc8c9d0b94367ca8efd.png",
	"weapon_ak47_cu_ak47_winter_sport": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_ak47_winter_sport_light_large.38cd1d1ce76c581e9ba3d6774ac1e700342fc0a1.png",
	"weapon_ak47_cu_fireserpent_ak47_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_fireserpent_ak47_bravo_light_large.9390e7fd091ea8a0434fd2143e0acf0d5d1bbc97.png",
	"weapon_ak47_cu_green_leather_ak47": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_green_leather_ak47_light_large.9622f0d289d98aa50238c0c956631b73bc3171ed.png",
	"weapon_ak47_cu_panther_ak47": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_panther_ak47_light_large.6b7c82083b5fbb71631ad7961ac1543d1fc2a5cd.png",
	"weapon_ak47_cu_pinstripe_ak47": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_pinstripe_ak47_light_large.2123421a26fbe673eea7c0238c7441a83b97aa17.png",
	"weapon_ak47_cu_tribute_ak47": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_tribute_ak47_light_large.f0ccfeea8a432a82cf4fb7f0411a724dbb43459a.png",
	"weapon_ak47_cu_well_traveled_ak47": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_cu_well_traveled_ak47_light_large.708a53ac473d7cd02037876a82b6b4c004bf9a31.png",
	"weapon_ak47_hy_ak47lam_blue": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_hy_ak47lam_blue_light_large.9f8ec5103efa5b7a0b3919a13b4de78e1bd612a0.png",
	"weapon_ak47_hy_ak47lam_bw": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_hy_ak47lam_bw_light_large.c504cab278a4955e92255ee2022340be2d0982a4.png",
	"weapon_ak47_hy_ak47lam": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_hy_ak47lam_light_large.199620e808579639264cf753d0650721b4bc1f37.png",
	"weapon_ak47_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_sp_mesh_tan_light_large.0372a5d37f473b9cf5e2ee32d2f5d36247f24a3a.png",
	"weapon_ak47_sp_spray_jungle": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_sp_spray_jungle_light_large.af524ea61be29ab81dfb321277b98a211338de37.png",
	"weapon_ak47_sp_zebracam": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ak47_sp_zebracam_light_large.5f15c9e41b9ac135b87cdadb407c9872e31c1f29.png",
	"weapon_aug_am_aug_jumble": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_am_aug_jumble_light_large.d86901a42f239ddc39cd645d2a17281881fe37d5.png",
	"weapon_aug_an_navy_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_an_navy_bravo_light_large.8057388b1d777096c036f1b2d8ba9ce15103678d.png",
	"weapon_aug_an_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_an_red_light_large.9adb894f02aff778fff9188a24eea1f0c8b66685.png",
	"weapon_aug_cu_anime_aug": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_cu_anime_aug_light_large.f049075c645871ee67b0b47253f59c26143efc49.png",
	"weapon_aug_cu_aug_chameleonaire": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_cu_aug_chameleonaire_light_large.ad1d2f62d1481931d8e23e0ab0fbd4e7a61135f7.png",
	"weapon_aug_cu_aug_progressiv": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_cu_aug_progressiv_light_large.f712baf9253bd357c71a1525dac51e30298c9535.png",
	"weapon_aug_hy_copperhead": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_hy_copperhead_light_large.166fd555b0075feb698783999d906c4529d2d631.png",
	"weapon_aug_hy_feathers_aug": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_hy_feathers_aug_light_large.e1419b52a3ddd4bed5328f438ea5dea07b0ba248.png",
	"weapon_aug_hy_tiger": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_hy_tiger_light_large.d2fe957d3903dc5779403ed1c95947e18fa7e6fd.png",
	"weapon_aug_so_pmc": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_so_pmc_light_large.e2a06ba5d6c412408d2447e162572817ee052bd3.png",
	"weapon_aug_so_space_marine": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_so_space_marine_light_large.ee525f5aaf19c6d97af3b0378d3d3cac26476d80.png",
	"weapon_aug_so_stormfront": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_so_stormfront_light_large.84dee43e41ff0fe95173b635e369b486848fe92f.png",
	"weapon_aug_sp_labyrinth3": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_sp_labyrinth3_light_large.86c4c77bbc59793e1bf632e1ef49101829a14773.png",
	"weapon_aug_sp_mesh_forest_fire": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_sp_mesh_forest_fire_light_large.eabf7b69ca1447bee596cdbaf21b48cd7537dbce.png",
	"weapon_aug_sp_nukestripe_orange_aug": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_aug_sp_nukestripe_orange_aug_light_large.4309138bd5b9e518628d517a275747ec9c2207d3.png",
	"weapon_awp_am_awp_glory": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_am_awp_glory_light_large.348eae0f5d4da8671886826648dd4197a9829090.png",
	"weapon_awp_am_crumple_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_am_crumple_bravo_light_large.5f59de227d280f3c3b39fae7e49ac143338ca5b2.png",
	"weapon_awp_am_lightning_awp": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_am_lightning_awp_light_large.3761894103ee0fec90af459928635933ba27e36d.png",
	"weapon_awp_aq_awp_twine": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_aq_awp_twine_light_large.f976c41b8f978d2b8d13734f14f6586982d859f1.png",
	"weapon_awp_cu_awp_asimov": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_cu_awp_asimov_light_large.32d9045f8a2bcd13ca18390cc9fd82026e7195ab.png",
	"weapon_awp_cu_awp_cobra": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_cu_awp_cobra_light_large.cf20ce6ac1151b4a30d8a84081ec4373cbfad4a4.png",
	"weapon_awp_cu_awp_hyper_beast": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_cu_awp_hyper_beast_light_large.7dd26637e8d50bc129d25ebdbf3e6e410917808e.png",
	"weapon_awp_cu_favela_awp": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_cu_favela_awp_light_large.4329c047ea1899f3846a1a81539ba2a27665a54e.png",
	"weapon_awp_cu_medieval_dragon_awp": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_cu_medieval_dragon_awp_light_large.cb3b8168e59e96fd33efa9578206a2aaed036fc0.png",
	"weapon_awp_cu_medusa_awp": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_cu_medusa_awp_light_large.05c6f5c67a2fbf7d042637568ba2ab25e44bb08c.png",
	"weapon_awp_hy_blam_simple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_hy_blam_simple_light_large.ed114947481e0366b2cde092a8ddac4d7250775b.png",
	"weapon_awp_hy_ddpat_pink": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_hy_ddpat_pink_light_large.a00bebead467a7106062058982a1f8651cf663bc.png",
	"weapon_awp_hy_hive": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_hy_hive_light_large.2189958e2afa2c69cfcdd807124c279a0e645625.png",
	"weapon_awp_hy_snakeskin": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_hy_snakeskin_light_large.e6addbb49a7024f800a35c9e081402a2c8631028.png",
	"weapon_awp_hy_zodiac2": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_hy_zodiac2_light_large.67da534322361569bd9637688b704b57232529fa.png",
	"weapon_awp_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_sp_mesh_tan_light_large.3608cbeb9bb163bfd2becb4ebcce2576b9ca78d9.png",
	"weapon_awp_sp_snake": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_awp_sp_snake_light_large.c0b327d960af85c987bed944287935fb4b6a780a.png",
	"weapon_bayonet_aa_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_aa_fade_light_large.5ac4f422043b48b47e4453cc250c79fda3e78855.png",
	"weapon_bayonet_am_blackpearl_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_am_blackpearl_marbleized_light_large.df1b0c31fec19fdb172e19e14715e3bc2f6a829b.png",
	"weapon_bayonet_am_doppler_phase1": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_am_doppler_phase1_light_large.2de778920740e6c402ab6ac36ff5e9410196fbe8.png",
	"weapon_bayonet_am_doppler_phase2": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_am_doppler_phase2_light_large.7bb28c4fb622f5b0647ebb278a50d91033ce9249.png",
	"weapon_bayonet_am_doppler_phase3": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_am_doppler_phase3_light_large.600d8e4ab650959fac293a63df72c178ab535651.png",
	"weapon_bayonet_am_doppler_phase4": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_am_doppler_phase4_light_large.0af828d4e9d548cf01328ac3eae38fbb5ea0306d.png",
	"weapon_bayonet_am_marble_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_am_marble_fade_light_large.adc286f39c98a9630620a97831ca2e5050229dff.png",
	"weapon_bayonet_am_ruby_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_am_ruby_marbleized_light_large.cb2d92df7e4a6ce60553da683fa7bd6e8f199ab1.png",
	"weapon_bayonet_am_sapphire_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_am_sapphire_marbleized_light_large.e9e04b5b6ff2df9067859cabc65cc15c245a0c4a.png",
	"weapon_bayonet_am_zebra": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_am_zebra_light_large.2234064362204e87ea5ce3f997dc691d844d9168.png",
	"weapon_bayonet_an_tiger_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_an_tiger_orange_light_large.780ff3a58d01a73d4d7d755adbdca46483d13faf.png",
	"weapon_bayonet_aq_blued": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_aq_blued_light_large.40905736c36dbdb9d08077ddaebb06cbb237f583.png",
	"weapon_bayonet_aq_damascus": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_aq_damascus_light_large.bd2b3b3fcd70fdec736a782fa5108ea9286d86a8.png",
	"weapon_bayonet_aq_forced": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_aq_forced_light_large.460998cd194f90f65aec10ccaea8644b42430fc0.png",
	"weapon_bayonet_aq_oiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_aq_oiled_light_large.920866e2a1f17fda7702e0b4cb95f45a8a8c0070.png",
	"weapon_bayonet_aq_steel_knife": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_aq_steel_knife_light_large.3a913d1a41833bcfb673a31cfdf3fddb592f2f85.png",
	"weapon_bayonet_hy_ddpat": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_hy_ddpat_light_large.f53cb47d0ef8b431116008ec3896f8cedb712fb5.png",
	"weapon_bayonet_hy_forest_boreal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_hy_forest_boreal_light_large.4ecbfdb740d7345cb38430c1a4da15cec468b5ce.png",
	"weapon_bayonet_hy_webs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_hy_webs_light_large.9246001fd8c8b0c077dc2836ea7271a4a020750b.png",
	"weapon_bayonet_so_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_so_night_light_large.11b2117af2e0f240111305857ab93e0091e347ed.png",
	"weapon_bayonet_so_purple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_so_purple_light_large.c7f08cb18f5cc792a27e186ee630614b93c35200.png",
	"weapon_bayonet_sp_dapple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_sp_dapple_light_large.5c6962d79b65eb2053770a887facae88b361fcfe.png",
	"weapon_bayonet_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_sp_mesh_tan_light_large.f0c1b71fd210b74b42dbf78253556e7ba9a99d15.png",
	"weapon_bayonet_sp_tape_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bayonet_sp_tape_urban_light_large.81c4d2a06c2d8c271a2b6de4bc47f0cb0d3f32be.png",
	"weapon_bizon_am_carbon_fiber": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_am_carbon_fiber_light_large.bc4fbdedf71b3b922a2596dac8df3c50306ecf51.png",
	"weapon_bizon_am_turqoise_halftone": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_am_turqoise_halftone_light_large.e34dc4bab2f1da66b04bd2d3cadb51339ce81f4d.png",
	"weapon_bizon_aq_brass": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_aq_brass_light_large.afcbbd3e31fd3600ddb45b4a0c48b6350ab761f9.png",
	"weapon_bizon_aq_steel_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_aq_steel_bravo_light_large.ace529ee6d0eefe9159eaf040b364ad853ccf893.png",
	"weapon_bizon_cu_bizon-osiris": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_cu_bizon-osiris_light_large.269e03e1ad598b76adb884704c4f48d725beb5fc.png",
	"weapon_bizon_cu_bizon_antique": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_cu_bizon_antique_light_large.06467175511976dae4219e9cb2fc8ab20df0e653.png",
	"weapon_bizon_cu_bizon_noxious": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_cu_bizon_noxious_light_large.dc3af57fa024448b24e4ddb8838a0a339cee46ce.png",
	"weapon_bizon_hy_bamboo_jungle_ink": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_hy_bamboo_jungle_ink_light_large.0f9ee611e9b667e90923e9fc0da89430881ae7ae.png",
	"weapon_bizon_hy_hunter_modern": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_hy_hunter_modern_light_large.04891176bf0284ba4f8002c2c32445cbde50a8c6.png",
	"weapon_bizon_hy_splatter": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_hy_splatter_light_large.7a7417d95485ceb2148bdd3d228219307082ea8a.png",
	"weapon_bizon_hy_varicamo_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_hy_varicamo_night_light_large.f0593c24d14333e68c7eb0e916385270d5612b46.png",
	"weapon_bizon_hy_water_crest": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_hy_water_crest_light_large.c4d0aad9cb87870f84f3709ff3b8ecc9fe489d89.png",
	"weapon_bizon_so_grey_nuclear_green_bizon": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_so_grey_nuclear_green_bizon_light_large.072e25b1fa34f50da3850310424b8b96983cf684.png",
	"weapon_bizon_sp_leaves": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_sp_leaves_light_large.ce2a773d74c050c18f99daaa39d4b670878abd99.png",
	"weapon_bizon_sp_nukestripe_brown": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_sp_nukestripe_brown_light_large.993c1c6ed6bf4a239268651e4150bc4a615f2632.png",
	"weapon_bizon_sp_tape_short_sand": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_sp_tape_short_sand_light_large.dcf913a3a4fcd421012482e8c1cb55d05d9828f9.png",
	"weapon_bizon_sp_tape_short_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_bizon_sp_tape_short_urban_light_large.141f3b1f24bc6c964a78ca58b38c01ad773fbc12.png",
	"weapon_cz75a_am_army_shine": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_am_army_shine_light_large.26736d48ea09a5284aeb1cf11292bc3e87a56251.png",
	"weapon_cz75a_am_diamond_plate": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_am_diamond_plate_light_large.ef425c82bae5d971bd5e1e9c54b9cd2f992e4e16.png",
	"weapon_cz75a_am_fuschia": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_am_fuschia_light_large.9ca4218835426c791482a3d7cc3b00d00c958d40.png",
	"weapon_cz75a_am_gyrate": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_am_gyrate_light_large.90f97369a79695a7fdcb633a9c9a9e56f29a05d5.png",
	"weapon_cz75a_am_nitrogen": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_am_nitrogen_light_large.ea1d17f7e0ba9fa71126a46b3ba99bf258dffe25.png",
	"weapon_cz75a_am_royal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_am_royal_light_large.f9f7bd8e5321fa0572adc2b77050608e5570cdaf.png",
	"weapon_cz75a_an_emerald": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_an_emerald_light_large.5c4734111477a884851cae6998871cbf7c870cc6.png",
	"weapon_cz75a_aq_etched_cz75": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_aq_etched_cz75_light_large.5fa7e4f56600efeaceb99a948c6fa5dc3648a3b9.png",
	"weapon_cz75a_cu_c75a-tiger": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_cu_c75a-tiger_light_large.b754b5a73c8f2b207942eb046efdbd4cade04513.png",
	"weapon_cz75a_cu_cz75_precision": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_cu_cz75_precision_light_large.a0d0ea9d92ff9c535cbdaa9c07a1a95a5181a82b.png",
	"weapon_cz75a_cu_cz75a_chastizer": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_cu_cz75a_chastizer_light_large.d3234c712c3c068adbbfd5718c468c778f2351dd.png",
	"weapon_cz75a_hy_bluehex": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_hy_bluehex_light_large.032e4b0999830a45d7439d07faef66b8299a105f.png",
	"weapon_cz75a_hy_plaid2": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_hy_plaid2_light_large.82e391ba61c092ece265e3bde16237ab5a510130.png",
	"weapon_cz75a_hy_webs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_hy_webs_light_large.2093b43aefa82ee6713c472384ea283fdd44f023.png",
	"weapon_cz75a_so_orange_accents2": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_so_orange_accents2_light_large.844bd6d01ce7c69486327ceb44b65b8c7cc49f2d.png",
	"weapon_cz75a_so_orca": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_cz75a_so_orca_light_large.8490865eba36c09ccd75a9b1f93445ff2e9f2b8f.png",
	"weapon_deagle_aa_flames": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_aa_flames_light_large.dd140c3b359c16ccd8e918ca6ad0b2628151fe1c.png",
	"weapon_deagle_aa_vertigo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_aa_vertigo_light_large.85a16e4bfb8b1cc6393ca5d0c6d3a1e6e6023323.png",
	"weapon_deagle_am_bronze_sparkle": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_am_bronze_sparkle_light_large.42dc1d2bae9e586f75d6425f94a195014891533b.png",
	"weapon_deagle_am_crystallized_dark": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_am_crystallized_dark_light_large.2d7d753a893ec3f0a470af9690aa64dcecd7146f.png",
	"weapon_deagle_am_ddpatdense_peacock": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_am_ddpatdense_peacock_light_large.a486db3160bcdcf6bc5a1d8179c450b02f620151.png",
	"weapon_deagle_am_scales_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_am_scales_bravo_light_large.6cba46695e74a8bee932ea90cea24e146cbef5e7.png",
	"weapon_deagle_am_seastorm_blood": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_am_seastorm_blood_light_large.1e92a7e19fde014e5a70832a93b440e0c036d596.png",
	"weapon_deagle_am_seastorm": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_am_seastorm_light_large.aef21efecda37237d24debe3f409f42954dadddd.png",
	"weapon_deagle_am_seastorm_shojo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_am_seastorm_shojo_light_large.7df4fe386dac18ae2a8c3e50df7dfb9165dece83.png",
	"weapon_deagle_aq_deagle_corinthian": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_aq_deagle_corinthian_light_large.1a694892a1953a131775451d0542508b4b3d9e77.png",
	"weapon_deagle_aq_deagle_naga": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_aq_deagle_naga_light_large.b410ad835b1894a448676ae0590586298af2cb33.png",
	"weapon_deagle_aq_engraved_deagle": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_aq_engraved_deagle_light_large.804a1a01a29bf80673b739f3eb220272a6838193.png",
	"weapon_deagle_aq_handcannon": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_aq_handcannon_light_large.e6e87ceb2337a423d225dc177342af3df4069585.png",
	"weapon_deagle_aq_pilot_deagle": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_aq_pilot_deagle_light_large.60b0e755ef14311a82f5f35928ad18dbb6ae2a86.png",
	"weapon_deagle_cu_deagle_aureus": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_cu_deagle_aureus_light_large.7fa76057cb05f2cab829be448f120ae540715d0e.png",
	"weapon_deagle_hy_ddpat_urb": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_hy_ddpat_urb_light_large.06af0cb0e08490f1fba17acd1b9c98978745c213.png",
	"weapon_deagle_hy_mottled_sand": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_hy_mottled_sand_light_large.615be084d4bc9db8c98451f13351cae1fa0ec69c.png",
	"weapon_deagle_hy_varicamo_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_hy_varicamo_urban_light_large.a9791d0046206f88085f2d0850ec577c6f535a47.png",
	"weapon_deagle_hy_webs_darker": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_hy_webs_darker_light_large.7b9cb19bac52ebe7c49e3abdfb0c400ea252fef8.png",
	"weapon_deagle_so_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_deagle_so_night_light_large.64e315553578f3c8bd08c96622fc2c34d5a789ba.png",
	"weapon_elite_am_crystallized_blue": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_am_crystallized_blue_light_large.5756d02f9908e1c4d70e6f1d9dae53b3731fc0fd.png",
	"weapon_elite_am_ossify_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_am_ossify_red_light_large.9da21d3dc7b64952d853818075f524a9e4c1dfd3.png",
	"weapon_elite_an_navy": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_an_navy_light_large.87999cce45a03f8e83c28db98874810a5c990c10.png",
	"weapon_elite_aq_forced": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_aq_forced_light_large.c654256613e0893b16be27a7621ec469a63a9955.png",
	"weapon_elite_cu_dualberretta_dragons": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_cu_dualberretta_dragons_light_large.2742674cbf237d1ba5fb6ed9f0d90e00a03570f9.png",
	"weapon_elite_cu_elites_urbanstorm": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_cu_elites_urbanstorm_light_large.d33c9dd65434d8b9f4e7b5092fcc2e07a874e625.png",
	"weapon_elite_cu_retribution": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_cu_retribution_light_large.8527b45e34039b45dea9d304bb5892a1d0de5268.png",
	"weapon_elite_cu_season_elites_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_cu_season_elites_bravo_light_large.03b5f4afcbffb80f73ce009da240f4aa1455c15f.png",
	"weapon_elite_gs_mother_of_pearl_elite": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_gs_mother_of_pearl_elite_light_large.2023e44b16f064c32962b691bcdb5d45051744bc.png",
	"weapon_elite_hy_marina_sunrise": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_hy_marina_sunrise_light_large.bcdf31f5af4a5b9bef2bb0d5336715a3a0407b92.png",
	"weapon_elite_hy_vines": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_hy_vines_light_large.bb506f02418403c8a48f7829bdc065a71c3a77d0.png",
	"weapon_elite_hy_zodiac1": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_hy_zodiac1_light_large.cedfe5166a361ccc3c32a28847addcdc66ad25d7.png",
	"weapon_elite_so_panther": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_so_panther_light_large.019431b3fca18b027d07fe29d0ee7bf88df75576.png",
	"weapon_elite_so_pmc": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_so_pmc_light_large.eb0b65f961c27f233d8846c80301666925712e93.png",
	"weapon_elite_so_space_marine": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_so_space_marine_light_large.101c6b29315d37db050a4c7817a4c11517baa167.png",
	"weapon_elite_so_tangerine": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_elite_so_tangerine_light_large.3fd8ec1b63079a11e24d78228ad989b51a30b0ca.png",
	"weapon_famas_am_famas_dots": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_am_famas_dots_light_large.dc6f19278bac52ea06b8e3576fa324624f2f82b4.png",
	"weapon_famas_am_nuclear_skulls2_famas": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_am_nuclear_skulls2_famas_light_large.ec9774f3b2a03f5411321dba792b05f19096547c.png",
	"weapon_famas_an_famas_sgt": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_an_famas_sgt_light_large.5a9241d41a3c35a3fbb20aebcd22253a6a85f72f.png",
	"weapon_famas_aq_famas_jinn": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_aq_famas_jinn_light_large.a0e1b8e2a572c5e3d6472181d4a0d6ce7f51139f.png",
	"weapon_famas_cu_broken_path_famas": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_cu_broken_path_famas_light_large.5d45539735d838ffefd26467a8c767b71807c785.png",
	"weapon_famas_cu_famas_lenta": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_cu_famas_lenta_light_large.7ab508a407e56ab541dae127ef5fc64f09f6ae08.png",
	"weapon_famas_cu_famas_pulse": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_cu_famas_pulse_light_large.fad5dfcd7b0ccfe655c7c3903d091140904959ec.png",
	"weapon_famas_hy_bluehex": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_hy_bluehex_light_large.fe87763b33ea8963cf87e9b8fd7b9bfc9014d747.png",
	"weapon_famas_hy_doomkitty": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_hy_doomkitty_light_large.c9dd7b8fb1a44d5691684aae406d360433550468.png",
	"weapon_famas_hy_reef": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_hy_reef_light_large.d3138f4491b5413241bf64a82e0545ddc4c9e80d.png",
	"weapon_famas_so_space_marine": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_so_space_marine_light_large.bc0a11080c9b3b50c13ddbe4afa3f6f96311fec4.png",
	"weapon_famas_sp_mesh_hot_and_cold": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_sp_mesh_hot_and_cold_light_large.c93a700bb3cf4d14241d3c837569b571685b0b29.png",
	"weapon_famas_sp_spitfire_famas_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_sp_spitfire_famas_bravo_light_large.ac455b0749733b0bdce019c0e0c74270d689eb95.png",
	"weapon_famas_sp_spray": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_famas_sp_spray_light_large.fe886d820746c0f4333c0e0ea6d308473e241c4b.png",
	"weapon_fiveseven_am_copper_flecks": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_am_copper_flecks_light_large.d2af814b76763880470bc7039d5569eb74b26978.png",
	"weapon_fiveseven_am_crystallized_silver": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_am_crystallized_silver_light_large.1c5e2fb5a3541523f1ff3a28f4138d83eed3a67f.png",
	"weapon_fiveseven_an_gunmetal_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_an_gunmetal_bravo_light_large.6aaf03603a7ef748f5395af2a738f899f423522b.png",
	"weapon_fiveseven_aq_57_feathers": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_aq_57_feathers_light_large.aa942f28d5fd868643b54ba0c317703d8b615754.png",
	"weapon_fiveseven_aq_oiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_aq_oiled_light_large.fdaa095453965b2be93f8aa90ae469d926fac4e7.png",
	"weapon_fiveseven_cu_fiveseven_banana": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_cu_fiveseven_banana_light_large.2d78a6614cb329ada893c8d028eb5c2b485f26f0.png",
	"weapon_fiveseven_cu_fiveseven_retrobution": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_cu_fiveseven_retrobution_light_large.7ef4b20b8c9aed4d6461861c9d93b81630f6ac71.png",
	"weapon_fiveseven_cu_fiveseven_urban_hazard": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_cu_fiveseven_urban_hazard_light_large.456966d23faf1034c51b8130b7a70294af087026.png",
	"weapon_fiveseven_hy_flowers": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_hy_flowers_light_large.4f94edf6ac032c15fedafa6ba1f2425a4ca8bded.png",
	"weapon_fiveseven_hy_forest_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_hy_forest_night_light_large.fc245886bed9e789350127f844afe63f34f64936.png",
	"weapon_fiveseven_hy_kami": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_hy_kami_light_large.ce4939fe41b30c6143f487879a57e4f5f227e811.png",
	"weapon_fiveseven_hy_kimono_diamonds": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_hy_kimono_diamonds_light_large.c82060a31b7e4b17c73eb76fd87c09037a3eba42.png",
	"weapon_fiveseven_so_grey_nuclear_orange_five_seven": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_so_grey_nuclear_orange_five_seven_light_large.1f99a49ba11741a36385ef0934d8066624d4d257.png",
	"weapon_fiveseven_so_jungle": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_so_jungle_light_large.d98e255283a8cfd09aacb25405a26e580e3d129f.png",
	"weapon_fiveseven_so_orange_accents": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_so_orange_accents_light_large.b5ab3af11de68b90ca8b18e359ac0338d1a2d7f4.png",
	"weapon_fiveseven_so_pmc": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_so_pmc_light_large.eb6a08d487f3423d956898bae7b84433b1f46d25.png",
	"weapon_fiveseven_so_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_so_red_light_large.29ae7b2264bd2a390ecf51a51293d2c2202fdea9.png",
	"weapon_fiveseven_sp_tape_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_fiveseven_sp_tape_orange_light_large.d784ec0c92136e9f3f33ca09444ff4fe6a1f5300.png",
	"weapon_g3sg1_am_g3sg1_murky": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_am_g3sg1_murky_light_large.bc4e8d0e70d2952576d5c9653da71f21bc02b810.png",
	"weapon_g3sg1_cu_chronos_g3sg1": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_cu_chronos_g3sg1_light_large.5db791048981cda0babe949ac443f09ba8aa9eb3.png",
	"weapon_g3sg1_cu_g3sg1_executioner": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_cu_g3sg1_executioner_light_large.36071be17a266f28d8631b0fd73a9be6767ce399.png",
	"weapon_g3sg1_gs_g3sg1_flux_purple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_gs_g3sg1_flux_purple_light_large.6ed40e104625c9607e7df5ee60373a19d3dae634.png",
	"weapon_g3sg1_hy_arctic_contrast": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_hy_arctic_contrast_light_large.d1444467ee9975d1b4d5287a280e8684e7338493.png",
	"weapon_g3sg1_hy_arctic": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_hy_arctic_light_large.0eb54eebce1517513ecdb3788459c09358971f77.png",
	"weapon_g3sg1_hy_bluepolygon_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_hy_bluepolygon_bravo_light_large.6638623a4979512bb048fa22f9ec06a5c1172c7e.png",
	"weapon_g3sg1_hy_desert": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_hy_desert_light_large.4e5561884f1cd7f8d6965b9c7991f89a702b72b4.png",
	"weapon_g3sg1_hy_kimono_diamonds_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_hy_kimono_diamonds_orange_light_large.bdab5d4f92f5733ed056bbe276761c377b5c3401.png",
	"weapon_g3sg1_hy_varicamo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_hy_varicamo_light_large.6c944e82080f68d87881cdab86852e9375af9bb9.png",
	"weapon_g3sg1_so_green": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_so_green_light_large.28c4e72757be64775c1111ac0e7142a147cacb9c.png",
	"weapon_g3sg1_so_pmc": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_so_pmc_light_large.563d94315a5a6f57039ccdf5b672bf65d608c819.png",
	"weapon_g3sg1_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_sp_mesh_tan_light_large.19acce2a10000a2c03f8f89dc39ff1af3e8ca195.png",
	"weapon_g3sg1_sp_tape_short_jungle": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_sp_tape_short_jungle_light_large.02fd06db8f950789b6c4bff265df06439382c585.png",
	"weapon_g3sg1_sp_zebracam_blue": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_g3sg1_sp_zebracam_blue_light_large.42199f9c4c0bd1ff9f569d6e7348c5cedf4630f5.png",
	"weapon_galilar_am_geometric_steps": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_am_geometric_steps_light_large.fd64d3b26b97da3c03ab009e91d3f53c95e86cc0.png",
	"weapon_galilar_an_titanium30v": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_an_titanium30v_light_large.4264e8ec1cedb3bce31a89c934c630bd56d480c1.png",
	"weapon_galilar_cu_cerbrus_galil": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_cu_cerbrus_galil_light_large.761250f955c66cbb100400e2fc1459ce74320282.png",
	"weapon_galilar_cu_galil_abrasion": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_cu_galil_abrasion_light_large.8398e4836a0c26add3514a6af2262704d85fec07.png",
	"weapon_galilar_cu_galil_eco": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_cu_galil_eco_light_large.7f64e2d77423b3c4263a74caeda18383c2e487d5.png",
	"weapon_galilar_cu_galilar_particles": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_cu_galilar_particles_light_large.8732f64d53dbc9b0c732641655d4f99124d8cacc.png",
	"weapon_galilar_cu_sandstorm": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_cu_sandstorm_light_large.008937727e75bf840d2b511d3d8493a12b5ed2ac.png",
	"weapon_galilar_gs_galil_nightwing": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_gs_galil_nightwing_light_large.bc71fb0b9102f22348f39015b7de5affd60829e0.png",
	"weapon_galilar_hy_crumple_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_hy_crumple_bravo_light_large.fcf25827c0ef88bac7e5b0567ecd5a7dbee01791.png",
	"weapon_galilar_hy_ddpat_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_hy_ddpat_orange_light_large.8499a023e61f6d3f7d03012521422bedaedd6c2b.png",
	"weapon_galilar_hy_forest_winter": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_hy_forest_winter_light_large.2a0bc5c784fc6782304eb3ef68e4f07c6c92d3bf.png",
	"weapon_galilar_hy_galil_kami": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_hy_galil_kami_light_large.f1783721b5318ea51bcb7890bf9cd0084afcd3e3.png",
	"weapon_galilar_hy_varicamo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_hy_varicamo_light_large.4893edef6838528fadcc0a790a0ed132cdf2f1b9.png",
	"weapon_galilar_hy_varicamo_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_hy_varicamo_urban_light_large.04b4d709f1a3de109c7173d5ef55181138b247e0.png",
	"weapon_galilar_so_orca": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_so_orca_light_large.5db78708464e031c686ae2e730e997e01526a7ea.png",
	"weapon_galilar_sp_mesh_slashes": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_sp_mesh_slashes_light_large.f3c1ef94e52aa6cfe3c3ba2890e0d5ac0764900a.png",
	"weapon_galilar_sp_spray_desert_sage": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_galilar_sp_spray_desert_sage_light_large.34f1268c2cf12e7794538b7140456d3716d81142.png",
	"weapon_glock_aa_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_aa_fade_light_large.61edcc69ff252d537a4dd14b016cbe826c26ae5b.png",
	"weapon_glock_am_aqua_flecks": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_am_aqua_flecks_light_large.e7d41ce4dbf0cd29f1eb3daa5ce0bb753abd1903.png",
	"weapon_glock_am_ddpatdense_silver": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_am_ddpatdense_silver_light_large.4d83c0a0b958bb15f694c7047996ece59f4be05a.png",
	"weapon_glock_am_dragon_glock": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_am_dragon_glock_light_large.e42a72a19a2239c992573b88179897af37c7f849.png",
	"weapon_glock_am_nuclear_pattern1_glock": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_am_nuclear_pattern1_glock_light_large.01e91d2930e04d43215becb90447b2ebec1cb8d9.png",
	"weapon_glock_aq_brass": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_aq_brass_light_large.c9fbb8483ca7b5859fafc3c8fe495b3d396205dd.png",
	"weapon_glock_aq_glock18_flames_blue": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_aq_glock18_flames_blue_light_large.5fed23d5a32793c25914eeb99b45f1a2b0cb9d6c.png",
	"weapon_glock_aq_glock_coiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_aq_glock_coiled_light_large.d4dcbf0d27479b95a4ad43c36f3b3f3dc87bbd84.png",
	"weapon_glock_cu_glock-liquescent": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_cu_glock-liquescent_light_large.151e954ed4aef28ccc55d0ca4b43a7d9644f36ac.png",
	"weapon_glock_cu_glock_deathtoll": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_cu_glock_deathtoll_light_large.cfcc6a17037a33bbb524ca1856c07cf76dda449d.png",
	"weapon_glock_gs_glock18_wrathys": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_gs_glock18_wrathys_light_large.8cf4aba20d193a1646b378a3d04a6fee3f66724c.png",
	"weapon_glock_hy_craquelure": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_hy_craquelure_light_large.8e97eb17a01e73c47a8987685d740b344aeb2cb8.png",
	"weapon_glock_hy_nerodia": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_hy_nerodia_light_large.540067f703bf7b020d8fedfcc6322523ab449d68.png",
	"weapon_glock_so_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_so_night_light_large.e56ea92b4b8c1914a7f5f4e789483313845a0b4a.png",
	"weapon_glock_so_olive": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_so_olive_light_large.1af3a84683b1f123d0bc17319d14979bf7a12115.png",
	"weapon_glock_so_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_so_red_light_large.17b18a34a4d840905587e918a8500576e91b0cb9.png",
	"weapon_glock_so_sand_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_glock_so_sand_bravo_light_large.b505115b9e7a3e6480697f0262d76c9518c65e50.png",
	"weapon_hkp2000_aa_fade_metallic": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_aa_fade_metallic_light_large.8efd81c9cf483adb6bdf58508800f62d3fc72310.png",
	"weapon_hkp2000_am_chainmail": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_am_chainmail_light_large.26e8d5e01b6af8dc85be34cf16830ef6280166fd.png",
	"weapon_hkp2000_am_ossify_blue_p2000_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_am_ossify_blue_p2000_bravo_light_large.91f225635f7e4a986b51e09bba106ca6a4bf7dbb.png",
	"weapon_hkp2000_am_p2000_imperial_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_am_p2000_imperial_red_light_large.c47e207307725ed1f9e8cf6d1478dbfd3523c7a7.png",
	"weapon_hkp2000_am_scorpion_p2000": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_am_scorpion_p2000_light_large.86333a595bc6c6139a4e84734e6eb88cd33d3e14.png",
	"weapon_hkp2000_an_silver": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_an_silver_light_large.84bfd2f0bdc7ab614d9cd7103b7d071606118166.png",
	"weapon_hkp2000_aq_p2000_boom": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_aq_p2000_boom_light_large.39f01b0b86b795bea56300432fecfbf93415ee58.png",
	"weapon_hkp2000_cu_favela_p2000": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_cu_favela_p2000_light_large.cc40db4d5048c7ddcfb52642d954e91400e59290.png",
	"weapon_hkp2000_cu_luggage_p2000": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_cu_luggage_p2000_light_large.6dfcea73af8a3cf42042fb75be69345cf5525347.png",
	"weapon_hkp2000_cu_p2000_fire_elemental": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_cu_p2000_fire_elemental_light_large.1e57d4d9f1c51e613c1923377aa55fab4b0ab1bc.png",
	"weapon_hkp2000_cu_p2000_ivory": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_cu_p2000_ivory_light_large.2a47b14b59ce796956958ce13cb60617148f7711.png",
	"weapon_hkp2000_cu_p2000_pulse": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_cu_p2000_pulse_light_large.a79fcfcd59202495573abfddc1e7627be62b4e1c.png",
	"weapon_hkp2000_hy_granite": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_hy_granite_light_large.30d6a68c522ae5dd0cf7a67e07eccb66cf50b04c.png",
	"weapon_hkp2000_hy_poly_camo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_hy_poly_camo_light_large.e4c6576e012974ba60e6dbc70fe5cd1cacc30011.png",
	"weapon_hkp2000_so_grassland": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_so_grassland_light_large.c2c8cd99960f57e1e4eeb1261dfaf3006e672577.png",
	"weapon_hkp2000_sp_labyrinth2": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_sp_labyrinth2_light_large.240b91eab5dc2e0f6806dfbd2fc5d33bdebe53bb.png",
	"weapon_hkp2000_sp_leaves_grassland": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_hkp2000_sp_leaves_grassland_light_large.a7885e449e09718b530a5f8e4b79a30931f104cb.png",
	"weapon_knife_butterfly_aa_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_aa_fade_light_large.b1ab5fb3ed08185a266334b6488a364bb3f220f8.png",
	"weapon_knife_butterfly_am_zebra": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_am_zebra_light_large.8f5d28f8b8607d83059c4df618b399e2fa551bb4.png",
	"weapon_knife_butterfly_aq_blued": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_aq_blued_light_large.969518ce760404d72095af853f90df7582e7889f.png",
	"weapon_knife_butterfly_aq_forced": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_aq_forced_light_large.1e52259f8bd6b3c242cedb2d0a879e9fc17b7a23.png",
	"weapon_knife_butterfly_aq_oiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_aq_oiled_light_large.d53e80b706e7d7fac9d22d265595ea1a959ea79b.png",
	"weapon_knife_butterfly_hy_ddpat": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_hy_ddpat_light_large.6e874d0a6db5d1468c3b5b99c303bf76837593fe.png",
	"weapon_knife_butterfly_hy_forest_boreal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_hy_forest_boreal_light_large.f817483d1e53b69919a8a11349b075c27d8829b1.png",
	"weapon_knife_butterfly_hy_webs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_hy_webs_light_large.8e3a3668a8678a4ce56b2675c60d7ec6a756827a.png",
	"weapon_knife_butterfly_so_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_so_night_light_large.9f2544c35867a540f1d0a5e446d10d35b4bb3202.png",
	"weapon_knife_butterfly_sp_dapple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_sp_dapple_light_large.6110a91f809c996696fa87d90b7ea88e0377d0df.png",
	"weapon_knife_butterfly_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_sp_mesh_tan_light_large.9c30ece5beb38356f406e5c5fa56e7f4056f0757.png",
	"weapon_knife_butterfly_sp_tape_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_butterfly_sp_tape_urban_light_large.dab43f48bd2eb2c9734c90b5482f222eaa95cebb.png",
	"weapon_knife_falchion_aa_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_aa_fade_light_large.1db6bc12f4b49677b330382c3e5af21f46d0c124.png",
	"weapon_knife_falchion_am_zebra": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_am_zebra_light_large.3cbce2191d2a20b88e610d8180c2f4a9ee0066ca.png",
	"weapon_knife_falchion_aq_blued": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_aq_blued_light_large.ead09a065b115e707a59aa49689af0ed3dd8d1f3.png",
	"weapon_knife_falchion_aq_forced": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_aq_forced_light_large.3b986dfc395e6607d1f05fcd1f3e6b8c2c2c1f59.png",
	"weapon_knife_falchion_aq_oiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_aq_oiled_light_large.ddcd8f4a87e08ab50fe3241e6791896125c48e03.png",
	"weapon_knife_falchion_hy_ddpat": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_hy_ddpat_light_large.3b2857b99bb2aa1b1337248d8a1ae24aae1bf450.png",
	"weapon_knife_falchion_hy_forest_boreal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_hy_forest_boreal_light_large.9bf4abd73deee0ae82ce0a8670e1056d3a546107.png",
	"weapon_knife_falchion_hy_webs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_hy_webs_light_large.9c355c7819b8fd993b543bceec976e798e6e8633.png",
	"weapon_knife_falchion_so_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_so_night_light_large.535e93982805360eacc5969e1b28fe64f15216fe.png",
	"weapon_knife_falchion_sp_dapple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_sp_dapple_light_large.072bd4143a0c769f2d78835eaee88de49c849bd3.png",
	"weapon_knife_falchion_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_sp_mesh_tan_light_large.eccb7999f574f5e1080dfef159c3903c4e6db0de.png",
	"weapon_knife_falchion_sp_tape_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_falchion_sp_tape_urban_light_large.c3904e816bfc30cd130a7a1865ef37a32ed03434.png",
	"weapon_knife_flip_aa_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_aa_fade_light_large.811f8e8af2e00675c047a9c1e9f04bbe5ace83b1.png",
	"weapon_knife_flip_am_blackpearl_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_am_blackpearl_marbleized_light_large.4f181c67a3cc273a46b7125f62ea71b5ac5e2f77.png",
	"weapon_knife_flip_am_doppler_phase1": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_am_doppler_phase1_light_large.64fbc93188ab47caa83c6bbde2f3940562f1b237.png",
	"weapon_knife_flip_am_doppler_phase2": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_am_doppler_phase2_light_large.23f42804bd0f94237f33e41ef21418978fb49563.png",
	"weapon_knife_flip_am_doppler_phase3": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_am_doppler_phase3_light_large.c698d5d6abba914d80d292dbb30feb351a768f33.png",
	"weapon_knife_flip_am_doppler_phase4": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_am_doppler_phase4_light_large.31ff013b1b6ae92cf6e4c97007dda525b7768fdd.png",
	"weapon_knife_flip_am_marble_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_am_marble_fade_light_large.57a993ab6632bab742dc96e8ebedf98473fa5b48.png",
	"weapon_knife_flip_am_ruby_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_am_ruby_marbleized_light_large.f69a655c30d77cec644ca2cad1573bd0390bf969.png",
	"weapon_knife_flip_am_sapphire_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_am_sapphire_marbleized_light_large.328a4e45e676a5d719ff0eefa69494ec308e9d35.png",
	"weapon_knife_flip_am_zebra": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_am_zebra_light_large.55467fb65475d82c452bc96180d101ffd7e76192.png",
	"weapon_knife_flip_an_tiger_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_an_tiger_orange_light_large.441c0d2cf427d90fb079e82af0d074c1bfad13e4.png",
	"weapon_knife_flip_aq_blued": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_aq_blued_light_large.495efc692fdc551331e407697152d98c990272c3.png",
	"weapon_knife_flip_aq_damascus": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_aq_damascus_light_large.9b08bc30249a431d8ea084daf7d9fcb8da5e0e19.png",
	"weapon_knife_flip_aq_forced": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_aq_forced_light_large.e9a6576a928a11fc3771b302f2b66539db29b503.png",
	"weapon_knife_flip_aq_oiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_aq_oiled_light_large.14589d4f366330490824f36e7f75219478e2cabd.png",
	"weapon_knife_flip_aq_steel_knife": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_aq_steel_knife_light_large.3be134e0b20c32442d7b508a2ec065af3c59ea89.png",
	"weapon_knife_flip_hy_ddpat": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_hy_ddpat_light_large.882d1120e7e558969121902d618da80b88105c3a.png",
	"weapon_knife_flip_hy_forest_boreal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_hy_forest_boreal_light_large.d4878851507a64925cb11000bfdab55caeb3e07c.png",
	"weapon_knife_flip_hy_webs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_hy_webs_light_large.e0bcc9e1d004bff0af07abc34a609c6654835ce6.png",
	"weapon_knife_flip_so_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_so_night_light_large.cd613460bfdf848992e25f0a45aa3ab17b6d46b6.png",
	"weapon_knife_flip_so_purple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_so_purple_light_large.6a76bb50dd3ebf15bd94cc5e0d39daf34b02270f.png",
	"weapon_knife_flip_sp_dapple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_sp_dapple_light_large.fdfee11d1148f81582f438cf1fdf175717c71a0e.png",
	"weapon_knife_flip_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_sp_mesh_tan_light_large.361c846ac7bce512f7077df8b8bd62da838ebe2e.png",
	"weapon_knife_flip_sp_tape_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_flip_sp_tape_urban_light_large.bd1c04395ea024acb863acb628becf77edd4e4eb.png",
	"weapon_knife_gut_aa_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_aa_fade_light_large.6e89c23706eafc34e7713c264fddeb94444a9b67.png",
	"weapon_knife_gut_am_blackpearl_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_am_blackpearl_marbleized_light_large.14cb974a948ef999b876ce9e1331f0ee1da88e19.png",
	"weapon_knife_gut_am_doppler_phase1": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_am_doppler_phase1_light_large.2a4881ccbbddc3cc0969575b87dc33b7079508fb.png",
	"weapon_knife_gut_am_doppler_phase2": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_am_doppler_phase2_light_large.28bb9c276f453d066675567371c6666eb491a2a1.png",
	"weapon_knife_gut_am_doppler_phase3": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_am_doppler_phase3_light_large.98127e9fd2f442f0de1407bb32d07bea87c43415.png",
	"weapon_knife_gut_am_doppler_phase4": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_am_doppler_phase4_light_large.dc195f9c5dba17853e4bbac9e5dc03729715b2bf.png",
	"weapon_knife_gut_am_marble_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_am_marble_fade_light_large.85f1cad22ba4e6716045d53e9e0cf5459760d152.png",
	"weapon_knife_gut_am_ruby_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_am_ruby_marbleized_light_large.3156a5f79681adf4a2f805ebdda71ff5b19a6de3.png",
	"weapon_knife_gut_am_sapphire_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_am_sapphire_marbleized_light_large.7f97b454cf788c75d75b43ff2363875e0869a4a5.png",
	"weapon_knife_gut_am_zebra": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_am_zebra_light_large.c374f8e71f300e4351b680b6246da645d3dea01d.png",
	"weapon_knife_gut_an_tiger_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_an_tiger_orange_light_large.4590d3a96661c5e54af3285cb237077fc63d486b.png",
	"weapon_knife_gut_aq_blued": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_aq_blued_light_large.0e40bb0e3eb5de3de1b925853e3e4ec755f9b65a.png",
	"weapon_knife_gut_aq_damascus": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_aq_damascus_light_large.9eaf9c050c3f5dfe5c647d361538a1ea7001f835.png",
	"weapon_knife_gut_aq_forced": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_aq_forced_light_large.3f5b057c710fc4403f54d3979f482f511eb69d8b.png",
	"weapon_knife_gut_aq_oiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_aq_oiled_light_large.f141737f74526886d0d4895281e9a57526314c5c.png",
	"weapon_knife_gut_aq_steel_knife": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_aq_steel_knife_light_large.d56ab6033e5da6115f6af2aba93bae8edde57cb3.png",
	"weapon_knife_gut_hy_ddpat": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_hy_ddpat_light_large.855f6ca62686c8f365e503d379b07b4c41a8658a.png",
	"weapon_knife_gut_hy_forest_boreal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_hy_forest_boreal_light_large.b28a4cfb134cd8be5da39f82db0df407577478e8.png",
	"weapon_knife_gut_hy_webs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_hy_webs_light_large.217a769ed0131db1d3aef5a40bc927d4470bb22d.png",
	"weapon_knife_gut_so_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_so_night_light_large.eec2bb404a436b6d74f19c72b88f70380ab31eee.png",
	"weapon_knife_gut_so_purple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_so_purple_light_large.dbe6989416501166c43bd1cfb18ee835dbfa0ac7.png",
	"weapon_knife_gut_sp_dapple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_sp_dapple_light_large.657af646f54600080b5c5e79133410eb47397fd6.png",
	"weapon_knife_gut_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_sp_mesh_tan_light_large.5f58d777d76148ba031b587fff1b0b3465d2c441.png",
	"weapon_knife_gut_sp_tape_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_gut_sp_tape_urban_light_large.71f4811888602d3b48f35e030bd39ecbcac7f22e.png",
	"weapon_knife_karambit_aa_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_aa_fade_light_large.c91680d753adc2fcc5ed2e45daf815f6d4ab50b7.png",
	"weapon_knife_karambit_am_blackpearl_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_am_blackpearl_marbleized_light_large.c6f1bd8f39a3e32fcfa8771735b8c881701087e3.png",
	"weapon_knife_karambit_am_doppler_phase1": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_am_doppler_phase1_light_large.16c0819028af598b772826c2bc675712a1d5af37.png",
	"weapon_knife_karambit_am_doppler_phase2": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_am_doppler_phase2_light_large.3e5fcaf3238986ae1d5aa853bf949d24243f50f4.png",
	"weapon_knife_karambit_am_doppler_phase3": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_am_doppler_phase3_light_large.387e1b902c99ffb114b205e7634a9e1976852d04.png",
	"weapon_knife_karambit_am_doppler_phase4": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_am_doppler_phase4_light_large.896ac75a15ae1117c86c56725a53956f1de3a3fb.png",
	"weapon_knife_karambit_am_marble_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_am_marble_fade_light_large.e5d0f471cc4aad8ddd6ede429afe8cd2d80c1cf2.png",
	"weapon_knife_karambit_am_ruby_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_am_ruby_marbleized_light_large.088f25aa5f78e402bc7617e9668aeb53b096b01b.png",
	"weapon_knife_karambit_am_sapphire_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_am_sapphire_marbleized_light_large.c75435d2e6877294547a839fa95bc97d746144a1.png",
	"weapon_knife_karambit_am_zebra": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_am_zebra_light_large.88457fbeca42e9dc1767983c76219d34b46abf14.png",
	"weapon_knife_karambit_an_tiger_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_an_tiger_orange_light_large.cd5a9d7da1f15b5360e825b7d8261210ce717643.png",
	"weapon_knife_karambit_aq_blued": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_aq_blued_light_large.14e928cdede91a05a47656bc1a470cd515b9d735.png",
	"weapon_knife_karambit_aq_damascus": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_aq_damascus_light_large.47a76f786c10dcd8e0cabbf7d0ffaec93ea9960a.png",
	"weapon_knife_karambit_aq_forced": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_aq_forced_light_large.548f11f88cda9d7dd2915bd53d17e319d28a60ed.png",
	"weapon_knife_karambit_aq_oiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_aq_oiled_light_large.52f9229d2960f5557a893a99cc679f1181b48d98.png",
	"weapon_knife_karambit_aq_steel_knife": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_aq_steel_knife_light_large.fe0b528138096b68d213ad497a76396483f68f50.png",
	"weapon_knife_karambit_hy_ddpat": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_hy_ddpat_light_large.4ce3d0d597a1481ff4cdc9ecc8c171748d492832.png",
	"weapon_knife_karambit_hy_forest_boreal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_hy_forest_boreal_light_large.8be99b9b53275463ecac09d080359af3526c4e81.png",
	"weapon_knife_karambit_hy_webs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_hy_webs_light_large.61217494aaae26081c31d87f15739f42b4c1444a.png",
	"weapon_knife_karambit_so_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_so_night_light_large.427484b82687b9eb24e38125f5ea9e983847f68f.png",
	"weapon_knife_karambit_so_purple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_so_purple_light_large.c30d6c61e9ec2e808b845d594a615e4623d56ee5.png",
	"weapon_knife_karambit_sp_dapple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_sp_dapple_light_large.88adf51bc8d53efc0d8c04114bd03d388e00d2b8.png",
	"weapon_knife_karambit_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_sp_mesh_tan_light_large.a2d4ccf9954b957c819ade72a1cbea7ca0f0ad1f.png",
	"weapon_knife_karambit_sp_tape_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_karambit_sp_tape_urban_light_large.d36d1cf81823ad0463a42ff3a8d9b1aff4910a73.png",
	"weapon_knife_m9_bayonet_aa_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_aa_fade_light_large.66027f3a763a8b0a89895f3bdd55485d21d8dcda.png",
	"weapon_knife_m9_bayonet_am_blackpearl_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_am_blackpearl_marbleized_light_large.a2a2b6c520268b3cb5f28191992a6abd7fba90ce.png",
	"weapon_knife_m9_bayonet_am_doppler_phase1": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_am_doppler_phase1_light_large.1a9960a6bba1a82aeab00b0207b4ff7c423a1f06.png",
	"weapon_knife_m9_bayonet_am_doppler_phase2": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_am_doppler_phase2_light_large.28f8cb435078f059613e15d75ac41f0c76de6a6f.png",
	"weapon_knife_m9_bayonet_am_doppler_phase3": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_am_doppler_phase3_light_large.95fc50f0bdaf9a55e7ad06c03a8b4d32a4e0684b.png",
	"weapon_knife_m9_bayonet_am_doppler_phase4": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_am_doppler_phase4_light_large.86c9efecf75efc496cccaa1294455c412f807d04.png",
	"weapon_knife_m9_bayonet_am_marble_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_am_marble_fade_light_large.732b2c0e3c297968ccc0c7ecde0438ab995f9720.png",
	"weapon_knife_m9_bayonet_am_ruby_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_am_ruby_marbleized_light_large.0a1877b623cbc33e8aa3527863a40f8d3e2c7a1a.png",
	"weapon_knife_m9_bayonet_am_sapphire_marbleized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_am_sapphire_marbleized_light_large.b1d0503236fedd3e5927d8d18a8cb146b2b1215f.png",
	"weapon_knife_m9_bayonet_am_zebra": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_am_zebra_light_large.53f9641b2b66b6587f779e5f222cc98a48489a1e.png",
	"weapon_knife_m9_bayonet_an_tiger_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_an_tiger_orange_light_large.49d5afb6d7f17cb0b384be1416a9533841174ac5.png",
	"weapon_knife_m9_bayonet_aq_blued": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_aq_blued_light_large.cf1eae5b0d42c0c265ee77addcd1207eba7a8a4b.png",
	"weapon_knife_m9_bayonet_aq_damascus_90": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_aq_damascus_90_light_large.c8510c6e031c61d9c1c2421df3b912125547dc83.png",
	"weapon_knife_m9_bayonet_aq_forced": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_aq_forced_light_large.e409b18452030f3efa41178b439556d6f067fa52.png",
	"weapon_knife_m9_bayonet_aq_oiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_aq_oiled_light_large.75bfecf8e9073c05ba21251889b8d49889f90669.png",
	"weapon_knife_m9_bayonet_aq_steel_knife": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_aq_steel_knife_light_large.b89310b9d111f845adf87260417a732028154f27.png",
	"weapon_knife_m9_bayonet_hy_ddpat": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_hy_ddpat_light_large.1f511e46981a71dc67aec2904af5c7a39de52268.png",
	"weapon_knife_m9_bayonet_hy_forest_boreal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_hy_forest_boreal_light_large.074a7a96a875a57e6ad16e8a678245f23e7d46bb.png",
	"weapon_knife_m9_bayonet_hy_webs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_hy_webs_light_large.5beb986be2c0fd1a6dde6cc3f360fb1a4b77823d.png",
	"weapon_knife_m9_bayonet_so_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_so_night_light_large.5acbbec44a12a3d5e53890c7a2e58aaf83ae2871.png",
	"weapon_knife_m9_bayonet_so_purple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_so_purple_light_large.5ca833ab51b7a972d9b5bb7792c88957a69c4b4c.png",
	"weapon_knife_m9_bayonet_sp_dapple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_sp_dapple_light_large.b810fef46499697606ff2c70139805beb784c5ae.png",
	"weapon_knife_m9_bayonet_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_sp_mesh_tan_light_large.10896c7c3028779b668885a229e5ba773637b69c.png",
	"weapon_knife_m9_bayonet_sp_tape_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_m9_bayonet_sp_tape_urban_light_large.b940d9da196a99dfa10f08a89c6d2843b5844fef.png",
	"weapon_knife_push_aa_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_aa_fade_light_large.f73d939a3358a126ffbb7b93c9f87b9b78a6c78f.png",
	"weapon_knife_push_am_zebra": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_am_zebra_light_large.a09a6cf348b102f80e87226cc71d03544e502703.png",
	"weapon_knife_push_aq_blued": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_aq_blued_light_large.e0b2ecdeec3fb3066cecaf5b2d9392bfe4dbc674.png",
	"weapon_knife_push_aq_forced": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_aq_forced_light_large.2ceafeb104afeb40f9ba4c7a7cc4d590bc36c3dd.png",
	"weapon_knife_push_aq_oiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_aq_oiled_light_large.cbcb75a234d66325b56318abcf1d1cc8ebe7b893.png",
	"weapon_knife_push_hy_ddpat": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_hy_ddpat_light_large.a5821bfe03d91034b78b0aaf1eaa50cf556645b3.png",
	"weapon_knife_push_hy_forest_boreal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_hy_forest_boreal_light_large.81e69f4bcf6d0cd60f909a0b6722e8bc12b982ca.png",
	"weapon_knife_push_hy_webs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_hy_webs_light_large.df749be6007a8df0ed8ee572e42151235ef7cfb8.png",
	"weapon_knife_push_so_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_so_night_light_large.6bf4ccf0b4c054ad19beb4d3da884cae5fb2a302.png",
	"weapon_knife_push_sp_dapple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_sp_dapple_light_large.2f7cde55a22c5cd038bceb38533f5397a9fc8252.png",
	"weapon_knife_push_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_sp_mesh_tan_light_large.b6b390c3652c2bc1c074cd23b3ca921bf9870b4b.png",
	"weapon_knife_push_sp_tape_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_push_sp_tape_urban_light_large.b443359282b2cbc75c2cc765af8c9a00e4b2dfdb.png",
	"weapon_knife_tactical_aa_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_aa_fade_light_large.6f2163cce4ff116224f809200c9e928dbfe1c92a.png",
	"weapon_knife_tactical_am_zebra": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_am_zebra_light_large.1296d76d34f1e5738524c808f365584a38aaf6bf.png",
	"weapon_knife_tactical_aq_blued": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_aq_blued_light_large.7c438b3c70933dd0e6b807a5690a777c3079843f.png",
	"weapon_knife_tactical_aq_forced": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_aq_forced_light_large.ba0ab23cf7421f130454b3e1816eb3302b588712.png",
	"weapon_knife_tactical_aq_oiled": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_aq_oiled_light_large.b43d1ca603f2c69764001a6b5f24f2856a6f0a65.png",
	"weapon_knife_tactical_hy_ddpat": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_hy_ddpat_light_large.109687895d7275eb80f4a78f212ecbeb81b3bdcb.png",
	"weapon_knife_tactical_hy_forest_boreal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_hy_forest_boreal_light_large.b67d3d1910d57252f27749a5e275354a7447e8d3.png",
	"weapon_knife_tactical_hy_webs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_hy_webs_light_large.ef2461c032877bf7d6b1600cfa1c21317bc9c460.png",
	"weapon_knife_tactical_so_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_so_night_light_large.b0f1183807fcb10c3592200d569dcc79073d1515.png",
	"weapon_knife_tactical_sp_dapple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_sp_dapple_light_large.f1e2b1478299963ebdf9c822bfc6efbabc1ec1c8.png",
	"weapon_knife_tactical_sp_mesh_tan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_sp_mesh_tan_light_large.314ea654cdba9c910a3872442245d2268be404cf.png",
	"weapon_knife_tactical_sp_tape_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_knife_tactical_sp_tape_urban_light_large.b1741a783b7017d5bf191ec9ab8f3a5427718294.png",
	"weapon_m249_aq_obsidian": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m249_aq_obsidian_light_large.c8a38c9354c2f4531f0802eaa49caa9878bbf9ed.png",
	"weapon_m249_cu_m249_sektor": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m249_cu_m249_sektor_light_large.c957e70c656024b2c062f7af2031a76cb3c83f1c.png",
	"weapon_m249_gs_m249_nebula_crusader": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m249_gs_m249_nebula_crusader_light_large.60f60c9e8203575e3e3f5574db51132e2b2fe7c7.png",
	"weapon_m249_hy_blizzard": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m249_hy_blizzard_light_large.d247530ad94ee2a0c164116b89fd3f38a43dbf30.png",
	"weapon_m249_hy_ddpat_jungle_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m249_hy_ddpat_jungle_bravo_light_large.d93812236444afc67a0d994cd3f6faa421a57114.png",
	"weapon_m249_hy_zodiac3": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m249_hy_zodiac3_light_large.299cb04c12c20280930562504161309fbb9c1e45.png",
	"weapon_m249_so_keycolors": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m249_so_keycolors_light_large.bf0fe2b5d5b5c65358519ebaeeed6da72032bf4b.png",
	"weapon_m249_sp_mesh_python": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m249_sp_mesh_python_light_large.39f20f5499a7d68e8b90a9e064c993e9a803d721.png",
	"weapon_m249_sp_spray": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m249_sp_spray_light_large.1954bdc0dc1e10eebeece7f34e2b9f8e51596d55.png",
	"weapon_m4a1_am_kimono_sunrise": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_am_kimono_sunrise_light_large.f4c4233632fed7004ab4666aeaceab53233cddd6.png",
	"weapon_m4a1_cu_bullet_rain_m4a1": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_cu_bullet_rain_m4a1_light_large.4b359387b8abcdb0ae92134ba0f2106c405d9222.png",
	"weapon_m4a1_cu_m4_asimov": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4_asimov_light_large.af03179f3d43ff55b0c3d114c537eac77abdb6cf.png",
	"weapon_m4a1_cu_m4a1_howling": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4a1_howling_light_large.c64a9fc9fa04b5d10d4b1e200135e59285c8a77c.png",
	"weapon_m4a1_cu_m4a4_ancestral": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4a4_ancestral_light_large.cbd9732689f42b7aec91bdb9166b1ee414974cb7.png",
	"weapon_m4a1_cu_m4a4_evil_daimyo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4a4_evil_daimyo_light_large.c208ba252c0d8902caa973a634cbfa945508a716.png",
	"weapon_m4a1_cu_m4a4_griffin": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_cu_m4a4_griffin_light_large.255bd83fd343ea8e8d84a1d5c94959d0b26cafae.png",
	"weapon_m4a1_cu_poseidon": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_cu_poseidon_light_large.3db5688a5b47bd5720e7384abf13c45231a3cc03.png",
	"weapon_m4a1_cu_titanstorm": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_cu_titanstorm_light_large.a161ff6ea23af2d9bbdc0a757f5163fa1ad87a30.png",
	"weapon_m4a1_cu_xray_m4": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_cu_xray_m4_light_large.e929bb3998df4902c2bd6f6fbb775cec071558ba.png",
	"weapon_m4a1_gs_m4a4_royal_squire": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_gs_m4a4_royal_squire_light_large.f802ec3cf9c1c6837d841384f6d112367340880b.png",
	"weapon_m4a1_hy_ddpat_urb": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_hy_ddpat_urb_light_large.7ced16120d54bcdc2faa66d215ae81041ab23bc4.png",
	"weapon_m4a1_hy_desert": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_hy_desert_light_large.30d1e3dcc03baca8d4a3f222b3b851ad12c77799.png",
	"weapon_m4a1_hy_hunter_modern": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_hy_hunter_modern_light_large.9753bebcd2ed4bba8a432283f35c5d197912db9d.png",
	"weapon_m4a1_hy_v_tiger": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_hy_v_tiger_light_large.cdf3f8e434ea36842fa520cabec812eaba3f2fa5.png",
	"weapon_m4a1_silencer_am_m4a1-s_alloy_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_am_m4a1-s_alloy_orange_light_large.82bd272d0256f17eb86029a8d1411c4e5bf2bc9c.png",
	"weapon_m4a1_silencer_am_metals": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_am_metals_light_large.1ef1155c712349b2aaee8172a3da7fb1e62e1362.png",
	"weapon_m4a1_silencer_am_zebra_dark": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_am_zebra_dark_light_large.f484368a478f5e02d1b9d5e2816354fe705503f3.png",
	"weapon_m4a1_silencer_an_red_m4a1s": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_an_red_m4a1s_light_large.ec59e9b09e1e9f46af18dea65ee90e5bdfe9ebb1.png",
	"weapon_m4a1_silencer_aq_m4a1s_basilisk": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_aq_m4a1s_basilisk_light_large.18370d6557500376e137c7f6b07c7ed46c9dccf2.png",
	"weapon_m4a1_silencer_cu_m4a1-s_elegant": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1-s_elegant_light_large.1acbb0060648091ac532de68cfd720b7ad980564.png",
	"weapon_m4a1_silencer_cu_m4a1-s_silence": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1-s_silence_light_large.e48d06783e5c6c99b2f65d6c82891ce9739f0181.png",
	"weapon_m4a1_silencer_cu_m4a1_hyper_beast": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1_hyper_beast_light_large.31850937661935a062d5f6faf5a1f02fdb90b861.png",
	"weapon_m4a1_silencer_cu_m4a1s_cyrex": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_cu_m4a1s_cyrex_light_large.144b4053eb73b4a47f8128ebb0e808d8e28f5b9c.png",
	"weapon_m4a1_silencer_gs_m4a1s_snakebite_gold": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_gs_m4a1s_snakebite_gold_light_large.574ace77e1044dbf3a387f200b2867332e974f70.png",
	"weapon_m4a1_silencer_hy_forest_boreal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_hy_forest_boreal_light_large.1a7f334b65d1ff1a4ca0bb4a1b164d643169f982.png",
	"weapon_m4a1_silencer_hy_icarus": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_hy_icarus_light_large.4af0a9b1122471816242601013d478ade6a0697b.png",
	"weapon_m4a1_silencer_hy_ocean_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_hy_ocean_bravo_light_large.7a942449926153575269af174733edc7bed5faeb.png",
	"weapon_m4a1_silencer_hy_redtiger": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_hy_redtiger_light_large.0b40a51b0020fa1781ddb7368e3b39c03263b2dd.png",
	"weapon_m4a1_silencer_hy_varicamo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_hy_varicamo_light_large.794803daec1d6d6cd2c47d8e8520d9f5f0b1fc1b.png",
	"weapon_m4a1_silencer_so_orange_accents": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_silencer_so_orange_accents_light_large.625f58cdc5641f440ccf2fe866c3152b5803d1f2.png",
	"weapon_m4a1_so_tornado": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_so_tornado_light_large.5e852b0952af47cde9b8c60edf137f34b81fe812.png",
	"weapon_m4a1_sp_nukestripe_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_sp_nukestripe_orange_light_large.deb3995ec0bd7021cf33ca089f1d889fb92aba94.png",
	"weapon_m4a1_sp_star_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_sp_star_bravo_light_large.d4a56abe885a1a03ea173a6aaeb4f10bcec6a0c2.png",
	"weapon_m4a1_sp_zebracam_bw": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_m4a1_sp_zebracam_bw_light_large.de08ef2a6d7524e682118cef5d12124c5156dfa8.png",
	"weapon_mac10_aa_fade": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_aa_fade_light_large.66a2040e861debe6e06faaba1435896282489197.png",
	"weapon_mac10_aa_fade_metallic": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_aa_fade_metallic_light_large.d45ca663d8c8f65a88e3abc56545cc017d912d33.png",
	"weapon_mac10_am_mac10_malachite": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_am_mac10_malachite_light_large.98dc2368225e1ca5ce272730fa32a927cf237bbc.png",
	"weapon_mac10_am_nuclear_skulls3_mac10": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_am_nuclear_skulls3_mac10_light_large.df74bf5cc61330fdf17392a952cdd05e69ea28e2.png",
	"weapon_mac10_an_silver": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_an_silver_light_large.a5daa6310d060060a4bc53d2a64153ada85edec3.png",
	"weapon_mac10_aq_etched_mac10_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_aq_etched_mac10_bravo_light_large.591fcbcea893653daa522ba99b5e0e8de47d4423.png",
	"weapon_mac10_cu_korupt": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_cu_korupt_light_large.f10d9471c826d2530fbcbc80d65e30c532a58b57.png",
	"weapon_mac10_cu_luggage_mac10": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_cu_luggage_mac10_light_large.55a03d4e8a179b6ddf50d768a509f69432c31750.png",
	"weapon_mac10_cu_mac10_alekhya_duo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_cu_mac10_alekhya_duo_light_large.87db08865afd64bb6d47f695ff76a1b21209322f.png",
	"weapon_mac10_cu_mac10_decay": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_cu_mac10_decay_light_large.b05ef3a57dc1d62aed59e91922891564e3c9370d.png",
	"weapon_mac10_cu_mac10_neonrider": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_cu_mac10_neonrider_light_large.e19de002e7c2dfe0a24bdbc56fff890ec45a0d6b.png",
	"weapon_mac10_cu_mac10_redhot": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_cu_mac10_redhot_light_large.5a7ab2a2922db130584c2cbe154e3c804adcae1d.png",
	"weapon_mac10_hy_ddpat_urb": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_hy_ddpat_urb_light_large.1358ebade6b3e38cc3844571a1d8a88debe32036.png",
	"weapon_mac10_so_indigo_and_grey": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_so_indigo_and_grey_light_large.8360d4d53a825cf526d4cb4bddde62ed9f705c94.png",
	"weapon_mac10_so_purple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_so_purple_light_large.740281bdd13096499f4454d446d067037b5922b7.png",
	"weapon_mac10_so_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_so_red_light_large.7b052b069a82705991d28fcf2712d66bed36a0a8.png",
	"weapon_mac10_so_tornado": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_so_tornado_light_large.f99809321a98a5c69d6859aa111b008186f82074.png",
	"weapon_mac10_sp_palm": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mac10_sp_palm_light_large.b287cab6921ee14d890e29e4d2307526a6238129.png",
	"weapon_mag7_am_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_am_urban_light_large.49c3b842a021265e8dd66f05ebe20fc76a6dfdba.png",
	"weapon_mag7_an_silver": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_an_silver_light_large.ffb14b93d930ff95920974edd78cf6b31b48fe43.png",
	"weapon_mag7_cu_mag7_heaven": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_cu_mag7_heaven_light_large.ea002eaa1f984e278f59a934ca9016f038d06120.png",
	"weapon_mag7_cu_mag7_myrcene": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_cu_mag7_myrcene_light_large.7cd0ed89db7accc44d3289f9f1529e0a75f4643e.png",
	"weapon_mag7_cu_mag7_redhot": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_cu_mag7_redhot_light_large.76087a836e8c98fd10765a4b56dca946ba5acb4d.png",
	"weapon_mag7_hy_geometric_steps_green": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_hy_geometric_steps_green_light_large.542348e3effe63aae75b070cb1ca7d193e8356cf.png",
	"weapon_mag7_hy_icosahedron": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_hy_icosahedron_light_large.f7ea8cca0b48a0463d0877af9c94e7f54d0f1d79.png",
	"weapon_mag7_so_aqua": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_so_aqua_light_large.fee69dfe94d0158d2e7d8d049accdb967b8a924a.png",
	"weapon_mag7_so_sand": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_so_sand_light_large.9dfc46fd60aa92768b02d39371d5aac04b892ff8.png",
	"weapon_mag7_so_stormfront": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_so_stormfront_light_large.40f72ef6782f32f64bd883923fedfe0d1512d582.png",
	"weapon_mag7_so_yellow": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_so_yellow_light_large.bb2e6280c1d92a574c93123d79d5724276db69f3.png",
	"weapon_mag7_sp_hazard_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_sp_hazard_bravo_light_large.51f8430aea46a8f93e504fb9ea950cd772930d6d.png",
	"weapon_mag7_sp_mag7_firebitten": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_sp_mag7_firebitten_light_large.640af2edb52a7f170620e175ddaa5f5cf763325b.png",
	"weapon_mag7_sp_nukestripe_brown": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mag7_sp_nukestripe_brown_light_large.e1d7540ba5131a2e2cf36a8f7c6edc98d0cd431a.png",
	"weapon_mp7_am_ossify_blue": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_am_ossify_blue_light_large.b2c077afc23ddb48381629155713816dbf09fb84.png",
	"weapon_mp7_an_navy": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_an_navy_light_large.7b705336c3ee472db933931597f0ab191217b3dc.png",
	"weapon_mp7_aq_mp7_ultramodern": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_aq_mp7_ultramodern_light_large.5351e1926e4a9599d149c4941a8603f4143ff999.png",
	"weapon_mp7_cu_mp7-commander": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_cu_mp7-commander_light_large.260d3f2765c83f75eadac5abd6ef4187ea2c2089.png",
	"weapon_mp7_cu_mp7_classified": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_cu_mp7_classified_light_large.231ba61751c2976258bf96b3d1db5ae6ecb03b95.png",
	"weapon_mp7_cu_mp7_nemsis": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_cu_mp7_nemsis_light_large.72074e71a27827f41dc5d6f511d2f003c1b60d8a.png",
	"weapon_mp7_hy_ddpat": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_hy_ddpat_light_large.0207fb5fe0a1e21cdda28e005f7960f2dc4728b9.png",
	"weapon_mp7_hy_gelpen": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_hy_gelpen_light_large.e19dd688c21ae094ffc3649e80ee1c1f0959125a.png",
	"weapon_mp7_hy_plaid1": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_hy_plaid1_light_large.56b2f9cbc6d9a7aae3c1eca41151a2067a1427e8.png",
	"weapon_mp7_hy_skulls": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_hy_skulls_light_large.3e38912bdbea8a2b03b149e619f9f141e54facfd.png",
	"weapon_mp7_hy_varicamo_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_hy_varicamo_red_light_large.7110895d0ad1626929f361598b7f201a5ef3701a.png",
	"weapon_mp7_so_olive_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_so_olive_bravo_light_large.fd49ae0c11fa44fb6110f4ec9d34651d4e6f9185.png",
	"weapon_mp7_so_whiteout": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_so_whiteout_light_large.1f27273c189c19b42567bdd44ffc3e5be70ea3a4.png",
	"weapon_mp7_sp_labyrinth": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_sp_labyrinth_light_large.05382e4a98099c6747e1a3d636b47bd617b8866a.png",
	"weapon_mp7_sp_spray_army": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_sp_spray_army_light_large.e879b8808f8c967e4f08fde194d6d58f64dfdb2d.png",
	"weapon_mp7_sp_tape_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp7_sp_tape_orange_light_large.5870d3d214c5b4cd923d68c4a016b72596808db1.png",
	"weapon_mp9_aa_pandora": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_aa_pandora_light_large.837ea28260252a1f654c272289007ae3c4c3e7ec.png",
	"weapon_mp9_aa_vertigo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_aa_vertigo_light_large.41a7195e0a6ba44c2fc64d64bee0635444b0c569.png",
	"weapon_mp9_am_metal_inlay": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_am_metal_inlay_light_large.a49681fb3a39bd378051dd22ff9f988fd831d41f.png",
	"weapon_mp9_am_mp9_nitrogen": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_am_mp9_nitrogen_light_large.3a0b5a7cd31a7cfd5f0d90b9a0a1dbfcdb642cca.png",
	"weapon_mp9_am_thorny_rose_mp9": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_am_thorny_rose_mp9_light_large.a187f13404eba96de622f4c94e85078fb18d8d7c.png",
	"weapon_mp9_an_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_an_red_light_large.051bb03c037d5218c15c2b9f9797b21b5d0744a8.png",
	"weapon_mp9_cu_mp9_chevron": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_cu_mp9_chevron_light_large.698ab583537e3ed4b7661d3fcf75be62f0cdfab9.png",
	"weapon_mp9_cu_mp9_deadly_poison": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_cu_mp9_deadly_poison_light_large.0776976e709ec7b503dd7e47b8c962338615b5da.png",
	"weapon_mp9_hy_nuclear_pattern2_mp9": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_hy_nuclear_pattern2_mp9_light_large.d5f2b29c15286ea4c63cd60061d1073ec7e84087.png",
	"weapon_mp9_hy_plaid2": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_hy_plaid2_light_large.05b87c77e5f3c91c317f92fad7078891f44a4538.png",
	"weapon_mp9_so_stormfront": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_so_stormfront_light_large.7ba67d4546c43cb6dfb9e46eb68d23d5b57471ae.png",
	"weapon_mp9_so_yellow": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_so_yellow_light_large.dfa50bdf02bccb9002d09c891d41ba65b1ce2d9c.png",
	"weapon_mp9_sp_tape_dots_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_sp_tape_dots_bravo_light_large.e6624212c506215295ff5bf1b4c9bd7523db3ab5.png",
	"weapon_mp9_sp_tape_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_sp_tape_orange_light_large.77854282ffc131b7bbe878c140b3c41bfb735242.png",
	"weapon_mp9_sp_tape_short_sand": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_mp9_sp_tape_short_sand_light_large.893d0bacf03750448cef4be1f649591b9622907e.png",
	"weapon_negev_am_army_shine": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_negev_am_army_shine_light_large.884085f4a13b786f0ac7234d616ff01a848f28d5.png",
	"weapon_negev_am_negev_glory": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_negev_am_negev_glory_light_large.11ebbe525e92bd0a56dd4d3a7795a31a01823ba7.png",
	"weapon_negev_an_navy": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_negev_an_navy_light_large.5dafc320a35bc04e03bbe0c4e4b1b293398d1bda.png",
	"weapon_negev_cu_bratatat_negev": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_negev_cu_bratatat_negev_light_large.b7589c335fb7066d53b1897e000f031d316641e6.png",
	"weapon_negev_cu_negev_annihilator": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_negev_cu_negev_annihilator_light_large.421039357ccbbcb9ba1456caa1ed2ae4829b5495.png",
	"weapon_negev_cu_negev_impact": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_negev_cu_negev_impact_light_large.3315f6272c9bb790f96731643232008b4b8c7296.png",
	"weapon_negev_cu_negev_titanstorm": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_negev_cu_negev_titanstorm_light_large.eb7badc75ecbb1b4cdf35bfb53088731bbe11cb0.png",
	"weapon_negev_hy_varicamo_desert": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_negev_hy_varicamo_desert_light_large.169bd7cc986fe8b3411c2f8dc484dad4ee9fff71.png",
	"weapon_negev_sp_negev_turq_terrain": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_negev_sp_negev_turq_terrain_light_large.9c6c678b0e6bc949c0688f3e1cf39ca73e0a44ae.png",
	"weapon_negev_sp_nuclear_pattern3_negev": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_negev_sp_nuclear_pattern3_negev_light_large.2d4cd96f9a94367d4c22991250eb9350437d8be6.png",
	"weapon_negev_sp_palm_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_negev_sp_palm_bravo_light_large.3271a8edfb42d163f18a957bc162ddf01f29d30a.png",
	"weapon_nova_am_crumple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_am_crumple_light_large.e46bab0dc8f8fe10b83c18ed9f9d9945352781af.png",
	"weapon_nova_am_oval_hex": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_am_oval_hex_light_large.766118990b3726617ed6203e95abc71417dbd057.png",
	"weapon_nova_cu_nova_antique": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_cu_nova_antique_light_large.3391e20bf69d1a630ab0551fd0c2fa196d028e44.png",
	"weapon_nova_cu_nova_koi": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_cu_nova_koi_light_large.28c3fe03f736b48dee10e1e88e77ac02132dcba6.png",
	"weapon_nova_cu_nova_ranger": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_cu_nova_ranger_light_large.e3e9d3d47d5707092223a268ef59adb53ce76278.png",
	"weapon_nova_cu_skull_nova": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_cu_skull_nova_light_large.558d42424adda8cc3383b05d5388f75837b07efa.png",
	"weapon_nova_cu_spring_nova": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_cu_spring_nova_light_large.0be95a01dd54b579186464d0533c5195ffb14a8f.png",
	"weapon_nova_cu_walnut_nova": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_cu_walnut_nova_light_large.38cd0f88162ed88eb81df71f5fb18139c3a36c77.png",
	"weapon_nova_hy_hunter_blaze_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_hy_hunter_blaze_orange_light_large.3aa81203583739ae361787f625976dee6b7a1f25.png",
	"weapon_nova_hy_hunter_modern": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_hy_hunter_modern_light_large.47b91ea74e82f6e041bcf2d03c117be62ae25909.png",
	"weapon_nova_hy_seaside_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_hy_seaside_bravo_light_large.bad13bb67e67ee02b782a574376df5e7e4ff766d.png",
	"weapon_nova_hy_zodiac1": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_hy_zodiac1_light_large.b06536b160c1807d7aa4c8e906771d3c5c2f7c59.png",
	"weapon_nova_so_green": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_so_green_light_large.f6b21316c800bb19022612e4b965f7d312e8e4f5.png",
	"weapon_nova_so_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_so_red_light_large.f19886d0d01e730fc1e050416a6642488526a94c.png",
	"weapon_nova_so_sand": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_so_sand_light_large.33854508338eb4801380c7d7d328f2285ad3a746.png",
	"weapon_nova_sp_camo_wood_blue": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_sp_camo_wood_blue_light_large.d63e06a38ef396a945defd7c1ad9da9ba79fe60d.png",
	"weapon_nova_sp_leaves": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_sp_leaves_light_large.b75cb0c1b82c4c1a559f0b1de3113cf967029176.png",
	"weapon_nova_sp_mesh_arctic_contrast": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_sp_mesh_arctic_contrast_light_large.b85fc46665b05c2a0eea955a7946e644a7618944.png",
	"weapon_nova_sp_zebracam": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_nova_sp_zebracam_light_large.4a13bdc4fa3b5cd7d89c8cc83700d3a13326a6c3.png",
	"weapon_p250_am_ddpatdense_silver": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_am_ddpatdense_silver_light_large.36220b384099ed61c2b9ba64af899b892e4a4c58.png",
	"weapon_p250_am_p250_beaded_paint": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_am_p250_beaded_paint_light_large.2ddd1d4b6dd6fa2082001802a60acfa9daba722d.png",
	"weapon_p250_am_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_am_urban_light_large.2f6ef478d97cb2887fc4106cf89768f6cccd8ed6.png",
	"weapon_p250_aq_p250_cartel": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_aq_p250_cartel_light_large.d63ea117934ac8f9a40afe027fa4a1438dbb1777.png",
	"weapon_p250_aq_p250_contour": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_aq_p250_contour_light_large.faf5b305c68d8ea23814163b0a69dafa7318b818.png",
	"weapon_p250_cu_bittersweet": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_cu_bittersweet_light_large.83cd48968d79412e0cf2233b8e18602ff2790ad4.png",
	"weapon_p250_cu_money": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_cu_money_light_large.a8632edd5846b8c9de09c711ada47f7decc739b7.png",
	"weapon_p250_cu_p250_mandala": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_cu_p250_mandala_light_large.0acb51464cd72643c6a1fefaf8736288eb5d02f7.png",
	"weapon_p250_cu_p250_refined": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_cu_p250_refined_light_large.9da38bc561b6576555b1700e9e10ddbc52994c67.png",
	"weapon_p250_hy_crumple_dark_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_hy_crumple_dark_bravo_light_large.159ee3e3e5c507d869c9089978a8ed82897fcfa4.png",
	"weapon_p250_hy_forest_boreal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_hy_forest_boreal_light_large.d805b3c56f74420ea25e14db86e7cf8181d98134.png",
	"weapon_p250_hy_gelpen": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_hy_gelpen_light_large.214a92b3bec9ab81ad0c13276fa4ac552530f31f.png",
	"weapon_p250_hy_hunter_modern": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_hy_hunter_modern_light_large.01e6755d9b42d1594837f60bad79e0f6295df8db.png",
	"weapon_p250_hy_kimono_diamonds_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_hy_kimono_diamonds_red_light_large.99ecb66f68d6bba4e17bc30cd72d5041e838371c.png",
	"weapon_p250_hy_nuclear_skulls4_p250": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_hy_nuclear_skulls4_p250_light_large.83b7c2eeff0d6fd0e6d780be0815111d199a46d6.png",
	"weapon_p250_hy_p250_crackshot": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_hy_p250_crackshot_light_large.538a33bb8d7af894f965257c39f699168e125cdd.png",
	"weapon_p250_hy_redhex": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_hy_redhex_light_large.099092ccf56439b922b51569ce87f2f908abcc19.png",
	"weapon_p250_so_sand": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_so_sand_light_large.c77b762093b4786e0c070317e6a2121c2e7b4c86.png",
	"weapon_p250_so_whiteout": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_so_whiteout_light_large.ffd6e614b63d3af24a04a9f7710b55210a7d0296.png",
	"weapon_p250_sp_kimono_diamonds": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_sp_kimono_diamonds_light_large.f8b2d66cdc64e8860b36ac2d08060d04e5ec6ae4.png",
	"weapon_p250_sp_nukestripe_green": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_sp_nukestripe_green_light_large.099ce352cdcf83040aad712968d066f260439c22.png",
	"weapon_p250_sp_splash_p250": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_sp_splash_p250_light_large.9270d8d14c39aef83407ea50e51f0eb89c17263d.png",
	"weapon_p250_sp_tape": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p250_sp_tape_light_large.8ece2047279c054325b0d2632559de145cef524a.png",
	"weapon_p90_am_slither_p90": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_am_slither_p90_light_large.583a90c66858cf0cc20253d2f4a0be1168eadbca.png",
	"weapon_p90_an_royalbleed": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_an_royalbleed_light_large.58dfb4851908d78c31e205477793a620923737db.png",
	"weapon_p90_cu_brown_leather_p90": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_cu_brown_leather_p90_light_large.6943b782f1c00dd933ca3ee3c19749ea2494899c.png",
	"weapon_p90_cu_catskulls_p90": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_cu_catskulls_p90_light_large.0ff2c5c53a691e28de02cd7b40e395d53d8c6826.png",
	"weapon_p90_cu_dragon_p90_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_cu_dragon_p90_bravo_light_large.200ef513ae29ae7651ad3f31e68b5b186279572f.png",
	"weapon_p90_cu_p90-asiimov": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_cu_p90-asiimov_light_large.0ca7f7fc032c98c5cc506ccde92b33e5836a8a88.png",
	"weapon_p90_cu_p90_mastery": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_cu_p90_mastery_light_large.f58ff489c92ffa8c6e4c42814bad01c352df0ab6.png",
	"weapon_p90_cu_p90_scorpius": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_cu_p90_scorpius_light_large.93c49b8d30b5aec10f7871450974706692a2056f.png",
	"weapon_p90_cu_p90_shapewood": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_cu_p90_shapewood_light_large.e7744840c89b1b83be82d2f64beb5a6719c47bd3.png",
	"weapon_p90_cu_p90_trigon": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_cu_p90_trigon_light_large.9f93f859fe1d03dfced62e52c4cab39ae2f8a9f3.png",
	"weapon_p90_hy_modspots": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_hy_modspots_light_large.a702b8feaf0e2568e60efb2ab722819b0521ea4b.png",
	"weapon_p90_hy_zombie": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_hy_zombie_light_large.7f66b30e6902ae7722b7951fd7446ae7e9b3880e.png",
	"weapon_p90_so_stormfront": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_so_stormfront_light_large.60d73691845ad5ad0e5d8a15b488807d9c25a57f.png",
	"weapon_p90_sp_dapple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_sp_dapple_light_large.6a715fc8b63ae569c2facb1607b5243c21a7280a.png",
	"weapon_p90_sp_mesh_glacier": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_sp_mesh_glacier_light_large.742539900d5186f68defb5fac7e6a82771c302dd.png",
	"weapon_p90_sp_mesh_hot_and_cold": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_sp_mesh_hot_and_cold_light_large.b1e759ec76815883bf3e293215e3858eaa0763b1.png",
	"weapon_p90_sp_nukestripe_maroon": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_sp_nukestripe_maroon_light_large.c3915e723b821c0d03fcaf506129b23f16bdff0f.png",
	"weapon_p90_sp_spray_sand": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_sp_spray_sand_light_large.18ac7e644639b8756fa3984055a493c5d7fc8249.png",
	"weapon_p90_sp_twigs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_p90_sp_twigs_light_large.32f929b66cdf34997897a48260a53946e786a531.png",
	"weapon_revolver_aa_fade_metallic_revolver": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_revolver_aa_fade_metallic_revolver_light_large.d56e81f58bb716ac6ca130bd41802bb8962dd0cf.png",
	"weapon_revolver_aa_fade_revolver": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_revolver_aa_fade_revolver_light_large.af77aee9f82936e7510b89e7f0c1bbf6bfaaff45.png",
	"weapon_revolver_hy_webs": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_revolver_hy_webs_light_large.2a0bbba44388502060a910b5a18f5b64b5be0b3d.png",
	"weapon_revolver_sp_tape": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_revolver_sp_tape_light_large.c8f9124ff70ca2a6e8867920cd39e4fb7308ac87.png",
	"weapon_sawedoff_aa_fade_metallic": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_aa_fade_metallic_light_large.aa7418206953ed4b7707ddbc859bb1eb7bf6c9ab.png",
	"weapon_sawedoff_aq_copper": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_aq_copper_light_large.a2d3d9236120109adf8df1bc53b7d02250f6a50a.png",
	"weapon_sawedoff_aq_sawedoff_blackgold": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_aq_sawedoff_blackgold_light_large.4a8c3a27c780c2a5ec3e4b6686498dce439d5a73.png",
	"weapon_sawedoff_aq_steel": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_aq_steel_light_large.b363c0f1eef83ac7291f8b64d338dcdd82183502.png",
	"weapon_sawedoff_cu_green_leather_sawedoff": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_cu_green_leather_sawedoff_light_large.16c853410a5696858a4dc383f04c3d5e42b08631.png",
	"weapon_sawedoff_cu_sawedoff_deva": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_cu_sawedoff_deva_light_large.9ffde04f2f082dce492b2fa6e250f69f538a50b5.png",
	"weapon_sawedoff_cu_sawedoff_octopump": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_cu_sawedoff_octopump_light_large.761df5911efc6a96061c7b34e41a2ff6ec61e58b.png",
	"weapon_sawedoff_cu_sawedoff_origami": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_cu_sawedoff_origami_light_large.5f1b3cef6d518cda69daafddd9b2c240a29cf0cc.png",
	"weapon_sawedoff_gs_sawedoff_necromancer": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_gs_sawedoff_necromancer_light_large.8cead257afdfaf5b852a61d2358aa3fb84def860.png",
	"weapon_sawedoff_hy_ali_tile_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_hy_ali_tile_bravo_light_large.979b575c05b90ab9ae836ff28396737323818e1b.png",
	"weapon_sawedoff_hy_bamboo_jungle_black": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_hy_bamboo_jungle_black_light_large.8c345668f9d6ba961f72fd67c405a8ed2cfffd4c.png",
	"weapon_sawedoff_hy_ddpat": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_hy_ddpat_light_large.e3f476b768693a046994a90e2aca045d329e6957.png",
	"weapon_sawedoff_hy_ddpat_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_hy_ddpat_orange_light_large.04fe163870ad65e17d8e4dd9403180ed3c5a218d.png",
	"weapon_sawedoff_hy_varicamo_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_hy_varicamo_red_light_large.8db408c4317e19bfdf8adc6c3183327866423445.png",
	"weapon_sawedoff_sp_nukestripe_brown": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_sp_nukestripe_brown_light_large.6a39be9be23998f45a37a5f71c6467dacb728a03.png",
	"weapon_sawedoff_sp_snake": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_sp_snake_light_large.5e65a350f30aa592de234f631d5d2cd98838fb4e.png",
	"weapon_sawedoff_sp_spray_desert_sage": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sawedoff_sp_spray_desert_sage_light_large.e944ddb90e97199d1f274c481462a3a660b9fc5a.png",
	"weapon_scar20_am_army_shine": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_am_army_shine_light_large.2d2f8b7c0d1a6f9541956d1bef018261ddd80542.png",
	"weapon_scar20_am_carbon_fiber": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_am_carbon_fiber_light_large.1e2b9188a7cffb26c7a912995de329bd70d0d1d9.png",
	"weapon_scar20_an_emerald_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_an_emerald_bravo_light_large.1fddac26d628445bdc9856e04b5e9c69f526120b.png",
	"weapon_scar20_aq_scar20_leak": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_aq_scar20_leak_light_large.06b9231638ba347e91c671ecf2c1364754794893.png",
	"weapon_scar20_cu_scar20_intervention": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_cu_scar20_intervention_light_large.96d9a26cca617207208a836d424d676bcb2ce3b9.png",
	"weapon_scar20_cu_scar_cyrex": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_cu_scar_cyrex_light_large.652fa08dcb476bbafc351ee7fe8091e19b70dd16.png",
	"weapon_scar20_gs_scar20_peacemaker03": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_gs_scar20_peacemaker03_light_large.061f9ac2ff0a040f6fcc296c451c09fe2e198f83.png",
	"weapon_scar20_hy_hunter_blaze_pink": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_hy_hunter_blaze_pink_light_large.b7af5eed6be0c7d95ec01e2ed916841da005ccfc.png",
	"weapon_scar20_hy_scar20_jungler": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_hy_scar20_jungler_light_large.4f6402fac5ca041aae7db17b214e5cfd55149c44.png",
	"weapon_scar20_hy_webs_darker": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_hy_webs_darker_light_large.8e06e878c22b82c6bb1045f26e1bbc1926faecf2.png",
	"weapon_scar20_so_pmc": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_so_pmc_light_large.c3e05baecc15229a989ddd093964e9c4e9fbe68a.png",
	"weapon_scar20_so_stormfront": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_so_stormfront_light_large.3bebdbcd4ea2ae851cdd2a06d0663121d01ebd79.png",
	"weapon_scar20_sp_mesh_sand": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_sp_mesh_sand_light_large.880aed82e5ba9c8c9d4a7ebb88e5a51491ce2d59.png",
	"weapon_scar20_sp_palm": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_scar20_sp_palm_light_large.ed935d932711961605c3b03b896560f4ebfe8861.png",
	"weapon_sg556_am_army_shine": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_am_army_shine_light_large.a07a97d5fba73aeecfc5cc9364e0d43d47892373.png",
	"weapon_sg556_an_navy": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_an_navy_light_large.5c45c1c33100694fc010a39ba92e3afab1d7c5e7.png",
	"weapon_sg556_aq_damascus_sg553": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_aq_damascus_sg553_light_large.543355687f0396ad10ed2f2705bc242ce5fdfbc5.png",
	"weapon_sg556_cu_luggage_sg553": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_cu_luggage_sg553_light_large.374b9493843853afc913a1735b154fcbbdbb6f89.png",
	"weapon_sg556_cu_sg553_cyrex": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_cu_sg553_cyrex_light_large.ef2fb1e4d88e8eb7c0efe12e231a773ca1792a4d.png",
	"weapon_sg556_cu_sg553_pulse": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_cu_sg553_pulse_light_large.d564900d05df0ee1da737cde6144eb55fa36684f.png",
	"weapon_sg556_gs_sg553_tiger_moth": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_gs_sg553_tiger_moth_light_large.18de0e5e029741a67330038e646fab1596fcfe88.png",
	"weapon_sg556_so_purple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_so_purple_light_large.44483356b334466acb6e781057d8f96a73cb376f.png",
	"weapon_sg556_so_tornado": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_so_tornado_light_large.32d15282560b205fb387cf876fc19da381951986.png",
	"weapon_sg556_so_yellow": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_so_yellow_light_large.afbe04152bdb3090623992005c23d3a997ae0ca3.png",
	"weapon_sg556_sp_mesh_python": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_sp_mesh_python_light_large.ee7a2353f499fc228f88aaa99bd7ac4d9fac1257.png",
	"weapon_sg556_sp_nukestripe_maroon_sg553": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_sp_nukestripe_maroon_sg553_light_large.95996aebdd6d4308d577f481e0c73250d2c82c74.png",
	"weapon_sg556_sp_spray_waves_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_sp_spray_waves_bravo_light_large.5d4e0e3977bf9f1fa8dd1576b5576b429546f98d.png",
	"weapon_sg556_sp_tape_dots_waves": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_sg556_sp_tape_dots_waves_light_large.6225b7ae003cefaab7deca7ea517576991055bbd.png",
	"weapon_ssg08_aa_fade_grassland": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_aa_fade_grassland_light_large.82950af31c177d14983665459ddee77f63379f4d.png",
	"weapon_ssg08_am_zebra_dark": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_am_zebra_dark_light_large.5636371696eee32d9a3e588ff3b42f6b33776d99.png",
	"weapon_ssg08_aq_leviathan": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_aq_leviathan_light_large.0d0ce425b5374642d0d1fbfd0c0ec634eb8570fb.png",
	"weapon_ssg08_cu_shark": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_cu_shark_light_large.00812c20a896847013b0a2913a166f6ba220a258.png",
	"weapon_ssg08_cu_ssg08_immortal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_cu_ssg08_immortal_light_large.294156dbab19f645942fe9cbafed88165aa70044.png",
	"weapon_ssg08_cu_ssg08_technicality": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_cu_ssg08_technicality_light_large.1a057a14ca191ce12629e06217cbe86097444b03.png",
	"weapon_ssg08_hy_mayan_dreams_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_hy_mayan_dreams_bravo_light_large.647a85eff07e6565e9e284968d9c11a1ec42da68.png",
	"weapon_ssg08_hy_ssg08_marker": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_hy_ssg08_marker_light_large.318454c8676dc6d72ad1b6e343e661d9831645fb.png",
	"weapon_ssg08_so_moss": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_so_moss_light_large.74753da395e67d490101269838df28e1b6313a25.png",
	"weapon_ssg08_so_sand": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_so_sand_light_large.71cb57b99ee95a92310b4f55d7709bc5f5cc255e.png",
	"weapon_ssg08_sp_palm_shadow": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_sp_palm_shadow_light_large.fb24b5ed2a03a35a12f5ee7166bc458ab4ae77e7.png",
	"weapon_ssg08_sp_short_tape": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ssg08_sp_short_tape_light_large.f2f54766f72c881bc020b924be5ae026dcf065da.png",
	"weapon_tec9_am_crystallized": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_am_crystallized_light_large.787b7ae299c33a003515537d5335b38d589e2e9f.png",
	"weapon_tec9_am_fluted_tec9": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_am_fluted_tec9_light_large.bfb4506150a675b24d3178f457507db2903364d6.png",
	"weapon_tec9_am_ossify": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_am_ossify_light_large.29b1e40ecb5781ee6f47b460d3372b5c6601d768.png",
	"weapon_tec9_an_titanium30v": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_an_titanium30v_light_large.76078065235a996df8184b684159dfee7efcd530.png",
	"weapon_tec9_aq_brass": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_aq_brass_light_large.0e78665f494e390a064c8a838030b4458536d9ae.png",
	"weapon_tec9_cu_tec9_asiimov": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_cu_tec9_asiimov_light_large.9a4fb9bbf6f01209b8fd3effeda1eecfc1e5a9a3.png",
	"weapon_tec9_cu_tec9_avalanche": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_cu_tec9_avalanche_light_large.eb6726a24084bf5f3c8c8c70cd8ea37425a708e3.png",
	"weapon_tec9_cu_tec9_sandstorm": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_cu_tec9_sandstorm_light_large.e38b0daacb3aa5d8f692a5ee05ad4bc0885808cd.png",
	"weapon_tec9_hy_bamboo_jungle": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_hy_bamboo_jungle_light_large.31268450fbb5b5c2221e6eaadbe7124cf85f3e1d.png",
	"weapon_tec9_hy_ddpat_urb": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_hy_ddpat_urb_light_large.bd44491d7de854c08e2951e14f9066afdb340dd6.png",
	"weapon_tec9_hy_geometric_steps_yellow": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_hy_geometric_steps_yellow_light_large.4d50c678bf9eeb9f063a432aa9d5aec68e863f7d.png",
	"weapon_tec9_hy_hades": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_hy_hades_light_large.9b5757d9034889f93b907b45dffe0a3802b2e4bc.png",
	"weapon_tec9_hy_nuclear_skulls5_tec9": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_hy_nuclear_skulls5_tec9_light_large.d83d7de4c10dbc5fae925a4cb531ca7a8deef3d1.png",
	"weapon_tec9_hy_varicamo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_hy_varicamo_light_large.8a863390cd0fc243c3697c3d551139d3553fde03.png",
	"weapon_tec9_so_olive": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_so_olive_light_large.6c35f2cb6ef0f893f02d70759c528fe4958adebc.png",
	"weapon_tec9_so_tornado_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_so_tornado_bravo_light_large.b9bcae80fa19a0a2a147484427733172c2189cb9.png",
	"weapon_tec9_sp_mesh_army": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_sp_mesh_army_light_large.b2404b6aa0c7e1584fe2691cfeba70d823aff562.png",
	"weapon_tec9_sp_nukestripe_green_tec9": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_tec9_sp_nukestripe_green_tec9_light_large.0067333625bf11ffa93d705dde553b4b2bf6f82c.png",
	"weapon_ump45_aa_flames": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_aa_flames_light_large.03387f4a0a4ac6fe60437ec998e93de0b39e9b8b.png",
	"weapon_ump45_am_carbon_fiber": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_am_carbon_fiber_light_large.b250b860bbe6f7a689448cc47b6ac25427e3d848.png",
	"weapon_ump45_am_ump_racer": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_am_ump_racer_light_large.6d935bf0d33ca90994b1dd9aec78a8938dcd94a2.png",
	"weapon_ump45_cu_labyrinth": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_cu_labyrinth_light_large.62c8aa10ca8ad146809a21031194e450190f8485.png",
	"weapon_ump45_cu_ump45_uproar": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_cu_ump45_uproar_light_large.04cd84320c4370bced14a3989b0e141cff67ec88.png",
	"weapon_ump45_cu_ump_corporal": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_cu_ump_corporal_light_large.49b7fb6af130ce3b6edadec53af1720d53d5bc27.png",
	"weapon_ump45_hy_ddpat_urb": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_hy_ddpat_urb_light_large.2a86a32be1865ab7757d80bfbee44c80662ee4d9.png",
	"weapon_ump45_hy_gelpen": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_hy_gelpen_light_large.79d22fa00d44408a719b7a840aa4497eebca68fb.png",
	"weapon_ump45_hy_lines_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_hy_lines_orange_light_large.d004ea389236e6fa5da2f0555ab5b3723bdf36d1.png",
	"weapon_ump45_so_caramel": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_so_caramel_light_large.4883dbae989e9c61805aa53ca5a02983f74657b9.png",
	"weapon_ump45_so_indigo_and_grey": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_so_indigo_and_grey_light_large.7a4685c334bf103f25ba1865dc0492315bf0ca5c.png",
	"weapon_ump45_sp_dapple": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_sp_dapple_light_large.a25c92df26ac1c70c65741a07d9da8b0d0785022.png",
	"weapon_ump45_sp_nukestripe_maroon": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_sp_nukestripe_maroon_light_large.929675f44f0303f77fdd556348294178ecf23db1.png",
	"weapon_ump45_sp_skull_diagram_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_sp_skull_diagram_bravo_light_large.f3bf563f6e0274f55377e4fe0422905586a3d19b.png",
	"weapon_ump45_sp_ump45_d-visions": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_ump45_sp_ump45_d-visions_light_large.33ae7e9e8bf24ee97f4f3d3ee113e51782a756fa.png",
	"weapon_usp_silencer_am_electric_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_am_electric_red_light_large.ef8005beba74458fabbe8f664e0b210b2ef3a007.png",
	"weapon_usp_silencer_am_zebra_dark": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_am_zebra_dark_light_large.add709b2eb683853f9508ddf9c22503d7efb9925.png",
	"weapon_usp_silencer_aq_usp_stainless": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_aq_usp_stainless_light_large.3f6edb8ebd4138742504859e0d3e7c51a23c39db.png",
	"weapon_usp_silencer_cu_kaiman": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_cu_kaiman_light_large.8ed168478e306bd382a90afb1b71ad9f7551b342.png",
	"weapon_usp_silencer_cu_luggage_usp-s": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_cu_luggage_usp-s_light_large.3adca3c85f5ae2b083489a1059e1254417ff73c8.png",
	"weapon_usp_silencer_cu_usp_elegant": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_cu_usp_elegant_light_large.416f607cc5faeb52be0f22e1b98450391f452ac2.png",
	"weapon_usp_silencer_cu_usp_kill_confirmed": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_cu_usp_kill_confirmed_light_large.a3a7b8f19c9fb931b18c1edd7dd21d44e2c3c2e0.png",
	"weapon_usp_silencer_cu_usp_progressiv": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_cu_usp_progressiv_light_large.91cde781cd0c8502bbbb66f37cc7f1baf2a10c05.png",
	"weapon_usp_silencer_cu_usp_sandpapered": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_cu_usp_sandpapered_light_large.8de907fed2d0036e0c6c1f326c20915e846227a7.png",
	"weapon_usp_silencer_cu_usp_spitfire": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_cu_usp_spitfire_light_large.883b877a8a57c9dd1128f2550ddd694d959f3150.png",
	"weapon_usp_silencer_hy_indigo_usp": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_hy_indigo_usp_light_large.d9210ce18263747a50e320061e333ae6141cc9e4.png",
	"weapon_usp_silencer_hy_redtiger": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_hy_redtiger_light_large.5d778f6030de49296f349081781d84ef215a9b90.png",
	"weapon_usp_silencer_hy_siege_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_hy_siege_bravo_light_large.517b89e78bfe8bad7ca1aab7edf1d02a56b2da26.png",
	"weapon_usp_silencer_hy_varicamo_night": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_hy_varicamo_night_light_large.df1cac3f27ea81237acbc9d56137f5e3ddf072d5.png",
	"weapon_usp_silencer_so_khaki_green": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_so_khaki_green_light_large.546b3eb856bbf2aeece29e2852688ddae13531b7.png",
	"weapon_usp_silencer_sp_leaves": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_usp_silencer_sp_leaves_light_large.a71c8dc482fea4aaa1c6b5c115e370a7e134ddfd.png",
	"weapon_xm1014_am_nuclear_skulls1_xm1014": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_am_nuclear_skulls1_xm1014_light_large.716e8296c07d3e6d5c9f5f20605c9608bbb78ca1.png",
	"weapon_xm1014_aq_blued": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_aq_blued_light_large.322850eb06df5352f302b6d4dffb1d2472dac596.png",
	"weapon_xm1014_aq_xm1014_hot_rod": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_aq_xm1014_hot_rod_light_large.f664b036e9b4ec638574f17a9b7ea0905e8c57e0.png",
	"weapon_xm1014_aq_xm1014_scumbria": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_aq_xm1014_scumbria_light_large.b8e79b3c4391784151d789edde360dbaaef7fd1f.png",
	"weapon_xm1014_aq_xm1014_sigla": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_aq_xm1014_sigla_light_large.71c180cd3b8bdea7d0b119ab2b9d54792c51b3aa.png",
	"weapon_xm1014_cu_leather_xm1014": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_cu_leather_xm1014_light_large.4b2f6f7df7d03f0bfb271d1d06c948bb8cdcb0c0.png",
	"weapon_xm1014_cu_xm1014_caritas": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_cu_xm1014_caritas_light_large.060e6378f5b5ab6fc53a2db451f3d68b8033f304.png",
	"weapon_xm1014_cu_xm1014_heaven_guard": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_cu_xm1014_heaven_guard_light_large.c7f3f8815f9caa92daa5ffe4390880c1606f4a81.png",
	"weapon_xm1014_hy_hunter_blaze_orange": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_hy_hunter_blaze_orange_light_large.def31710e14b573829a2138ffc7c3eadb3f49e5c.png",
	"weapon_xm1014_hy_snakeskin_red": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_hy_snakeskin_red_light_large.d019a25e10fe53f2edf2958fb322c59621abc4de.png",
	"weapon_xm1014_hy_varicamo_blue": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_hy_varicamo_blue_light_large.6b99e2f4d5092295c86b872e2a08d7ea698fe5b6.png",
	"weapon_xm1014_hy_varicamo_desert": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_hy_varicamo_desert_light_large.8931cbff2aa329928977420d05616b306eb0a91f.png",
	"weapon_xm1014_so_grassland": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_so_grassland_light_large.412e08f5f190db15e6118e19c6ea0752bbaed180.png",
	"weapon_xm1014_so_jungle_bravo": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_so_jungle_bravo_light_large.0b0998c1c247ffc870bbdbc4c53696cd8a974f30.png",
	"weapon_xm1014_so_moss": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_so_moss_light_large.5308796fa6ef2edaa45a6c6e73c59452fc265781.png",
	"weapon_xm1014_sp_nukestripe_maroon": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_sp_nukestripe_maroon_light_large.8b6facf30ed6057509fcaf2c8a75a04c2629203a.png",
	"weapon_xm1014_sp_tape_dots_urban": "http://media.steampowered.com/apps/730/icons/econ/default_generated/weapon_xm1014_sp_tape_dots_urban_light_large.751c1e2059e1b9b8ef64b4cd94b22e35cccd0477.png",

	// Normal Weapons (No Skin)
	"weapon_ak47": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_ak47.a320f13fea4f21d1eb3b46678d6b12e97cbd1052.png",
	"weapon_aug": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_aug.6b97a75aa4c0dbb61d81efb6d5497b079b67d0da.png",
	"weapon_awp": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_awp.2899e1c6345ed05d62bdbe112db1b117d022e477.png",
	"weapon_bayonet": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_bayonet.515de291204d6d896724d9fbb6856fcc6054a787.png",
	"weapon_bizon": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_bizon.58523d37ee43b9a4ef42a67b65a28e5967743a56.png",
	"weapon_c4": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_c4.98f6ef853be4a712c684562b2460dd3e3ace8f64.png",
	"weapon_cz75a": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_cz75a.057939990f5f295fc5eaf8f758cdef21a7cfeb8a.png",
	"weapon_deagle": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_deagle.29e8f0d7d0be5e737d4f663ee8b394b5c9e00bdd.png",
	"weapon_decoy": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_decoy.d09e626c3d81f1f262bbca6146407f279a24dd03.png",
	"weapon_elite": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_elite.6563e9d274c6e799d71a7809021624f213d5e080.png",
	"weapon_famas": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_famas.c897878873beb9e9ca4c68ef3a666869c6e78031.png",
	"weapon_fiveseven": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_fiveseven.7c33b4a78ae94a3d14e7cd0f71b295cf61717d75.png",
	"weapon_flashbang": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_flashbang.bbde1307eeb99d78ef67c3a87a3a713023b63af2.png",
	"weapon_g3sg1": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_g3sg1.986d0e07f58c81c99aa5a47d86340f4c3d400339.png",
	"weapon_galilar": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_galilar.b84153658afdb7dc26a9854e566fde3fc42c22ef.png",
	"weapon_glock": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_glock.8430afea5349054d0923cefa7d2e7bf3950ce3d7.png",
	"weapon_hegrenade": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_hegrenade.7b344756d5dbdda4fd2e583a227a670599889f59.png",
	"weapon_hkp2000": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_hkp2000.c2221f8c2ef3df6c2fcdafd1bea9faae01f64054.png",
	"weapon_incgrenade": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_incgrenade.94d31f4f1af7d2e695f403d9a55f2cd64f3459b2.png",
	"weapon_knife": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_knife.a07b900d79ea768eae1a217a2839c5727f760396.png",
	"weapon_knife_butterfly": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_knife_butterfly.794147e84a4e9426202d45145910cbb007797ce5.png",
	"weapon_knife_falchion": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_knife_falchion.adcc43a018fd4fe315dbdbc7960cfc52c5d63e3e.png",
	"weapon_knife_flip": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_knife_flip.ebfc00735792b1e2947b30a321a07215dae8ceed.png",
	"weapon_knife_gut": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_knife_gut.1d53007384970e8eaf28448312777683fd633a79.png",
	"weapon_knife_karambit": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_knife_karambit.8b491b581a4b9c7b5298071425f2b29a39a2a12f.png",
	"weapon_knife_m9_bayonet": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_knife_m9_bayonet.1a55109e0c88792e5d56ea04dc1f676e44f9dec2.png",
	"weapon_knife_push": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_knife_push.13f409f23e653107c90711e5ab258b52b187ff6a.png",
	"weapon_knife_t": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_knife_t.6c6fbb53be0e00096168d04a9b3e7f2ab0938090.png",
	"weapon_knife_tactical": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_knife_tactical.7621bbad70410deb629d60ed98ef248dac525356.png",
	"weapon_m249": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_m249.02d1cf8fa8c41af5a43749bf780c4c4a2e50ea8e.png",
	"weapon_m4a1": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_m4a1.39b3bd8d556e5cdebb79d60902442986eb9aedff.png",
	"weapon_m4a1_silencer": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_m4a1_silencer.a8d2a028fa33eb117d6d7665303c3316169c33f7.png",
	"weapon_mac10": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_mac10.41e40474aa21a9ed90d9b21dd5adf0910f766426.png",
	"weapon_mag7": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_mag7.5480ba05c61153309163c46e7d646d6958af9bf7.png",
	"weapon_molotov": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_molotov.d700f0165e02bd9f2cb6bdb63bb76b4cac450b76.png",
	"weapon_mp7": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_mp7.0afc09868c38a00fde50c3e4943637c714e8981e.png",
	"weapon_mp9": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_mp9.c9103efde0845eb715cdcb67bf74bad646b1c5bc.png",
	"weapon_negev": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_negev.1cf512eb01bd62bcae5c54feec694f418ab71d30.png",
	"weapon_nova": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_nova.d9063351d4233101d02def18aa7e901d02f9b4c1.png",
	"weapon_p250": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_p250.0bc9109121fb318a3bb18f6fa92692c7aa433205.png",
	"weapon_p90": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_p90.15fedd7fc90f003b8de0ded36245b438d54bc3d2.png",
	"weapon_revolver": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_revolver.a7c0ab2973cdc0bdb53ebbef960ecbae8842f719.png",
	"weapon_sawedoff": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_sawedoff.4c4df9c84e1edc20488c45061ad88cfd2460c4a5.png",
	"weapon_scar20": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_scar20.1552c7b64dfe9e542a3b730edb80e21dcc6d243d.png",
	"weapon_sg556": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_sg556.74040869391ea2ab25777f3670a6015191a73e6c.png",
	"weapon_smokegrenade": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_smokegrenade.8746d3fec5a1041d61412295aee74c7d873ccacb.png",
	"weapon_ssg08": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_ssg08.271a856f50fd6ac1014334098b1a43d61bddb892.png",
	"weapon_taser": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_taser.3c80d155bf0547c377217920f2c7329c8b00d472.png",
	"weapon_tec9": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_tec9.74538566492b4af122be9b996bdd7d08585db3c0.png",
	"weapon_ump45": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_ump45.55669e2321f28efed775be27f7e3c7e71b501520.png",
	"weapon_usp_silencer": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_usp_silencer.608e10862885084bb1cec55d87ba5e694bfd621d.png",
	"weapon_xm1014": "http://media.steampowered.com/apps/730/icons/econ/weapons/base_weapons/weapon_xm1014.7bd7f3985d680db2fcb7cad32b07c90b758c234b.png"
};

var rifles = [
	"weapon_ak47",
	"weapon_aug",
	"weapon_awp",
	"weapon_famas",
	"weapon_G3SG1",
	"weapon_galilar",      // galil
	"weapon_m4a1",         // m4a4
	"weapon_m4a1_silencer",
	"weapon_scar20",
	"weapon_sg556",        // sg553
	"weapon_ssg08",        // scout
];
var smgs = [
	"weapon_bizon",
	"weapon_mac10",
	"weapon_mp7",
	"weapon_mp9",
	"weapon_p90",
	"weapon_ump45",
];
var heavy = [
	"weapon_mag7",
	"weapon_nova",
	"weapon_sawedoff",
	"weapon_xm1014",
	"weapon_m249",
	"weapon_negev",
	"weapon_g3sg1",
];
var pistols = [
	"weapon_cz75a",
	"weapon_deagle",
	"weapon_elite",
	"weapon_fiveseven",
	"weapon_glock",
	"weapon_hkp2000",
	"weapon_p250",
	"weapon_tec9",
	"weapon_usp_silencer",
	"weapon_revolver",
];

module.exports = {
	// logs the data straight from the post requests
	logJSON: function (json) {
		fs.writeFile("json.log",json,function(err){
			if (err)
				console.log(err);
		});
		console.log("log written @ " + Math.round(+new Date()/1000));
	},
	organizeWeapons: function (json) {
		var csgoJson = JSON.parse(json);
		var csgoWeapons = csgoJson.player.weapons;


		if (csgoJson.player) {
			var newWeapons = {
				weapons: {
					primary: {
						name: '',
						ammo: 0,
						ammo_max: 0,
						ammo_reserve: 0,
						img: '',
					},
					secondary: {
						name: '',
						ammo: 0,
						ammo_max: 0,
						ammo_reserve: 0,
						img: '',
					},
					knife: {
						name: '',
						img: '',
					},
					flashes: 0,
					he: 0,
					smoke: 0,
					molly: 0,
					incgrenade: 0,
					decoy: 0,
					zeus: false,
				},
				currentWeapon: {

				},
				reloading: false,
				bomb: false,
			};

			// 
			//  I should probably write a function to do this weapon matching and the such
			//  maybe hash table?
			//  
			//  I need to learn more about data structures
			// 

			if (csgoWeapons) {
			for (i=0;i<Object.keys(csgoWeapons).length;i++) {
				var thisWeapon = csgoWeapons[weaponPrefix+i];
				// rifles
				for (k=0;k<rifles.length;k++) {
					if (thisWeapon.name == rifles[k]) {
						newWeapons.weapons.primary.name = thisWeapon.name;
						newWeapons.weapons.primary.ammo = thisWeapon.ammo_clip;
						newWeapons.weapons.primary.ammo_max = thisWeapon.ammo_clip_max;
						newWeapons.weapons.primary.ammo_reserve = thisWeapon.ammo_reserve;
						if (thisWeapon.paintkit == "default") {
							newWeapons.weapons.primary.img = skinUrl[thisWeapon.name];
						} else {
							newWeapons.weapons.primary.img = skinUrl[thisWeapon.name + "_" + thisWeapon.paintkit];
						}
						break;
					}
				}
				// smgs
				for (k=0;k<smgs.length;k++) {
					if (thisWeapon.name == smgs[k]) {
						newWeapons.weapons.primary.name = thisWeapon.name;
						newWeapons.weapons.primary.ammo = thisWeapon.ammo_clip;
						newWeapons.weapons.primary.ammo_max = thisWeapon.ammo_clip_max;
						newWeapons.weapons.primary.ammo_reserve = thisWeapon.ammo_reserve;
						if (thisWeapon.paintkit == "default") {
							newWeapons.weapons.primary.img = skinUrl[thisWeapon.name];
						} else {
							newWeapons.weapons.primary.img = skinUrl[thisWeapon.name + "_" + thisWeapon.paintkit];
						}
						break;
					}
				}
				// heavy
				for (k=0;k<heavy.length;k++) {
					if (thisWeapon.name == heavy[k]) {
						newWeapons.weapons.primary.name = thisWeapon.name;
						newWeapons.weapons.primary.ammo = thisWeapon.ammo_clip;
						newWeapons.weapons.primary.ammo_max = thisWeapon.ammo_clip_max;
						newWeapons.weapons.primary.ammo_reserve = thisWeapon.ammo_reserve;
						if (thisWeapon.paintkit == "default") {
							newWeapons.weapons.primary.img = skinUrl[thisWeapon.name];
						} else {
							newWeapons.weapons.primary.img = skinUrl[thisWeapon.name + "_" + thisWeapon.paintkit];
						}
						break;
					}
				}
				// pistols
				for (k=0;k<pistols.length;k++) {
					if (thisWeapon.name == pistols[k]) {
						newWeapons.weapons.secondary.name = thisWeapon.name;
						newWeapons.weapons.secondary.ammo = thisWeapon.ammo_clip;
						newWeapons.weapons.secondary.ammo_max = thisWeapon.ammo_clip_max;
						newWeapons.weapons.secondary.ammo_reserve = thisWeapon.ammo_reserve;
						if (thisWeapon.paintkit == "default") {
							newWeapons.weapons.secondary.img = skinUrl[thisWeapon.name];
						} else {
							newWeapons.weapons.secondary.img = skinUrl[thisWeapon.name + "_" + thisWeapon.paintkit];
						}
						break;
					}
				}
				if (thisWeapon.name.indexOf("weapon_knife") >= 0) {
					newWeapons.weapons.knife.name = thisWeapon.name;
					if (thisWeapon.paintkit == "default") {
						newWeapons.weapons.knife.img = skinUrl[thisWeapon.name];
					} else {
						newWeapons.weapons.knife.img = skinUrl[thisWeapon.name + "_" + thisWeapon.paintkit];
					}
				}

				// nades
				switch (thisWeapon.name) {
					case "weapon_flashbang":
						newWeapons.weapons.flashes = thisWeapon.ammo_reserve;
						break;
					case "weapon_smokegrenade":
						newWeapons.weapons.smoke = thisWeapon.ammo_reserve;
						break;
					case "weapon_hegrenade":
						newWeapons.weapons.he = thisWeapon.ammo_reserve;
						break;
					case "weapon_incgrenade":
						newWeapons.weapons.incgrenade = thisWeapon.ammo_reserve;
						break;
					case "weapon_molotov":
						newWeapons.weapons.molly = thisWeapon.ammo_reserve;
						break;
					case "weapon_decoy":
						newWeapons.weapons.decoy = thisWeapon.ammo_reserve;
						break;
					default: 
				}

				// tazer
				if (thisWeapon.name == "weapon_taser")
					newWeapons.weapons.zeus = true;

				// c4
				if (thisWeapon.name == "weapon_c4")
					newWeapons.bomb = true;

				// weapon states
				if (thisWeapon.state == "active") {
					newWeapons.currentWeapon = thisWeapon.name;
				} else if (thisWeapon.state == "reloading") {
					newWeapons.currentWeapon = thisWeapon.name;
					newWeapons.reloading = true;
				}

			}
			}
			return newWeapons;
		}
		else {
			var errReturn = {"err": "Data provided has no weapons to organize"};
			return errReturn;
		}
	},
	// mostly fixes smoked, burning, flashed from 0-255 to 0-100 or fractions
	organizeState: function (json) {
		var csgoJson = JSON.parse(json);
		var csgoState = csgoJson.player.state;

		// function that changes number (max 255)[8 bit binary max]
		// to anohter number (max 100) [percents/easier for humans]
		var binaryTo100 = function (n) {
			var out = Math.round((n/255)*100);
			return out;
		};

		if (csgoState) {

		var newState = {
			health: csgoState.health, // 0 to 100
			armor: csgoState.armor,   // 0 to 100
			helmet: csgoState.helmet, // bool
			flashed: binaryTo100(csgoState.flashed), // now 0 to 100
			smoked: binaryTo100(csgoState.smoked),   // now 0 to 100
			burning: binaryTo100(csgoState.burning), // now 0 to 100
			money: csgoState.money, // 0 to max
			kills: csgoState.round_kills, // 0 to max
			headshots: csgoState.round_killshs, // 0 to # of kills
		};		

		return newState;
		}
	},
	organizeRound: function (json) {
		var csgoJson = JSON.parse(json);
		var csgoRound = csgoJson.round;
		return csgoRound;
	},	
	organizeMap: function (json) {
		var csgoJson = JSON.parse(json);
		if (csgoJson) {
			var csgoMap  = csgoJson.map;

			var newMap = {
				mode: csgoMap.mode,
				name: csgoMap.name,
				phase: csgoMap.phase,
				round: csgoMap.round,
				team_ct_score: csgoMap.team_ct.score,
				team_t_score: csgoMap.team_t.score
			};
		
			return newMap;
		}

	}
	// stats need to organizing
};
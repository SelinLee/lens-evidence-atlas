# PMC新云入口补检：先复查400μm器件MTF原始数据

QUALITY-001u；2026-11-15。接续Colburn2018原始SI取得的新路径，补检此前受访问限制或缺原始数组的研究。具体论文/文件安排只放本待办检查点，长期目标保持原研究范围与active。

## 已验证的新入口

[PMC旧OA服务公告](https://pmc.ncbi.nlm.nih.gov/tools/oa-service/)说明该接口在2026-08停用，旧`oa.fcgi`404不是论文/附件不存在的证据。[官方Cloud说明](https://pmc.ncbi.nlm.nih.gov/tools/pmcaws/)及[README](https://pmc-oa-opendata.s3.amazonaws.com/README.txt)给出匿名HTTPS逐文件目录/JSON元数据，入口无需用户登录。

本轮Colburn2018已用新入口取得此前旧路径403的13页SI，核PDF魔数、官方MD5与独立SHA256并实际阅读/视觉核；详见[已完成批次的核验](COLBURN_2018_REVIEW_2026-11-15.md)。不是把文件目录或OA标志当已取得全文。

## 当前优先：Chang2024的400μm/NA0.02器件

用户最初指定 DOI **10.1038/s41467-024-53701-8** 的MTF原始数据仍重要；[2026-11-14原核查](CHANG_MTF_DATA_AUDIT_2026-11-14.md)只关闭有范围公开性核查，未声称已取得数表或原始PSF。新云入口需单独补检，不修改那次核查的历史日期。

已实际取得[新云JSON](https://pmc-oa-opendata.s3.amazonaws.com/PMC11544246.1/PMC11544246.1.json)200，核同DOI/题名，version1、is_manuscript=false、is_retracted=false；[目录查询](https://pmc-oa-opendata.s3.amazonaws.com/?list-type=2&prefix=PMC11544246.&max-keys=100)200，`IsTruncated=false`、10对象，包括主文JSON/XML/TXT/PDF、4幅主图和两个补充PDF。目前只新读元数据/清单，**尚未通过新云下载/读取两个PDF或写入新的科学测量**。

| 正式云对象 | 清单字节 | JSON MD5 |
| --- | --- | --- |
| [41467_2024_53701_MOESM1_ESM.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC11544246.1/41467_2024_53701_MOESM1_ESM.pdf) | 3353891 | `d55aea74a625a2158096eba9966fd3d9` |
| [41467_2024_53701_MOESM2_ESM.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC11544246.1/41467_2024_53701_MOESM2_ESM.pdf) | 2669476 | `ab588e41e945fb58cb75b421fe1f8bcb` |

旧核查已识别MOESM1为24页SI、MOESM2为同行评审材料；新云版本仍应校验实际文件/哈希/内容再确认一致，不能只凭序号或相同文件名继承读取结论。清单无独立数组文件名也不能代替检查PDF嵌入附件、出版方Source Data和作者外部数据入口。

## 下一步范围

1. 下载两个新云PDF，验证魔数/页数、MD5与JSON一致并算SHA256；与已核正式静态附件/用户只读08_references版本比较，不改只读库。
2. 同字节则明确复用旧内容核查并更新访问位置/日期；不同字节则重读相关Methods/S5/Fig.S6及同行评审数据回应、检查嵌入文件/新增外链。不能把相同文件反复当新原始证据数量。
3. 若有数表/原始PSF，核400μm器件归属、波长/场点/方向、空间采样/单位/归一化与处理；本库PSF复算另标。若仍仅曲线，数值留空，补充新云清单的真实覆盖边界。
4. 完成这一小范围补检后，继续本库此前缺SI/原图的原始研究与新代表作；按新云metadata/version实际可用性逐篇核，不批量刷新未重读来源日期，不把短期名单固化进长期目标。

当前快照仅`/tmp/lens-mtf-audit/chang2024-newcloud*`；没有向作者发信，没有把元数据当MTF数据，也没有因旧入口404重启任何已发布部署。

# Hu2023：超宽带渐近色散原作检查点

历史入口检查点，科学核验已接续至[本批核验](HU_2023_REVIEW_2026-11-15.md)，下文保留当时读取边界。

QUALITY-001x；2026-11-15。接续Ndao2020，长期目标active；具体论文只在待办与日志。

## 入选与去重

回到前批实际已读Javed2026 SI p.13 **ref4**：Hu et al., *Asymptotic dispersion engineering for ultra-broadband meta-optics*, Nature Communications **14,6649(2023)**，DOI **10.1038/s41467-023-42268-5**。拟补不同宽带色散机制/实制结构的原始器件与可见光光谱测量，优先原始焦位、PSF/MTF和效率定义，不抄比较表。当前数据/中央来源/题录按DOI与题名无匹配，只读08_references按asymptotic/42268/hu.*2023文件名无匹配，后者不代表PDF全文穷尽去重。不用引用量/IF。

## 已核原始文件与边界

[EuropePMC精确DOI查询](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1038/s41467-023-42268-5&format=json)200/973字节定位**PMC10589226**。[新云JSON](https://pmc-oa-opendata.s3.amazonaws.com/PMC10589226.1/PMC10589226.1.json)200/1251字节，同题/DOI、version1、is_manuscript=false/is_retracted=false，citation为2023-10-20/14:6649；[目录](https://pmc-oa-opendata.s3.amazonaws.com/?list-type=2&prefix=PMC10589226.&max-keys=100)200/3141字节、IsTruncated=false、9对象（主文PDF/JSON/XML/TXT、四主图、SI）。清单没有独立数组文件不等于全网无数据或附件未嵌入数据。

| 正式对象 | 实际字节 / 页数 | JSON MD5 | 独立SHA256 |
| --- | --- | --- | --- |
| [PMC10589226.1.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC10589226.1/PMC10589226.1.pdf) | 2083313 / 9页 | 8b02f396d274acc340be4941ffa2c50c | d69df6cad849438364488ad92117f5bef7d4d89e664707504ee3c61eb77b8dca |
| [41467_2023_42268_MOESM1_ESM.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC10589226.1/41467_2023_42268_MOESM1_ESM.pdf) | 21258575 / 27页 | add31b52a5e196830bbfc685520d96d5 | 08d1eca8c1294bbc382f1aab8c6d16d572318d3966c824fd2b8c0fe3eec9d707 |

两文件独立无头Chrome实际200、%PDF、MD5与官方JSON一致，SHA256/页数已核。只查metadata与主PDF第一页题名/作者/DOI、摘要起始数行，**尚未读方法/实验参数/性能/SI正文或视觉核图表，未查PDF嵌入附件**，不预填器件数值或称已精读。PDF metadata时间戳不是出版更正证据，入库前仍核正式页面/更新与SI版本。仅暂存`/tmp/lens-mtf-audit/hu2023-*`，不提交全文/图像，不操作用户Chrome资料，不联系作者。

## 下一批核验

先核正式版本/更新与Data/Code availability、Source Data/作者数据入口；读主文相关设计/方法/实验与27页SI中对应器件/表格/图。逐配置分离制成实物、设计例/模拟、连续声明与实际谱点。优先D/NA/设计f、逐λ实测焦距/轴向参考/残余色差，PSF/FWHM/MTF/Strehl与效率积分/功率分母；若得到原始PSF，核采样与处理后再讨论复算。图/界限/归属冲突留原述和位置，不估曲线冒充原数表，按真实谱点作可见光筛选。经录入、校验测试构建、PR/合并/Pages及独立无头Chrome验收后关有限批次，长期目标继续。

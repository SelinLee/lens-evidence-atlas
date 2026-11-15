# Ndao2020：经典宽带原作与SI检查点

本文件为原作取得阶段的历史快照；后续[001w有限批次/线上发布验收已完成](NDAO_2020_REVIEW_2026-11-15.md)，当前下一篇见[Hu2023检查点](HU_2023_NEXT_CHECKPOINT_2026-11-15.md)。原始读取边界保留，不作当前未读状态。

QUALITY-001w；2026-11-15。接续Du2025，长期目标保持active。具体论文放待办/日志，不修改长期目标正文。

## 入选与去重

本批实际读到Du2025原PDF p.7（印G）**ref26**引用Ndao et al., *Octave bandwidth photonic fishnet-achromatic-metalens*, Nature Communications11,3205(2020)，DOI **10.1038/s41467-020-17015-9**；前批Javed2026 SI也有该原作线索。拟补经典宽带/不同结构的原始实测，实际可见光谱点与近红外覆盖待原作逐项核，不抄比较表数字。不使用引用量/IF。当前26 study/DOI无本篇；只读08_references按ndao/fishnet/17015文件名范围检索，无匹配，不能据文件名宣称全文去重穷尽。

## 已取得原始存档

[EuropePMC精确DOI查询](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1038/s41467-020-17015-9&format=json)实际200/983字节，定位**PMC7316784**。按[正式新云非截断清单](https://pmc-oa-opendata.s3.amazonaws.com/?list-type=2&prefix=PMC7316784.&max-keys=100)200/3123字节，`IsTruncated=false`、9对象（主文PDF/JSON/XML/TXT、四主图、SI PDF）。[JSON](https://pmc-oa-opendata.s3.amazonaws.com/PMC7316784.1/PMC7316784.1.json)200/1227字节，同题/DOI、version1、is_manuscript=false/is_retracted=false。未把清单/JSON当已读全文或原始数组。

| 实际正式文件 | 字节 / 页数 | 官方MD5 | 独立SHA256 |
| --- | --- | --- | --- |
| [PMC7316784.1.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC7316784.1/PMC7316784.1.pdf) | 1911019 / 6页 | ade3becfdedea3d9e244e5c66fa10b9f | 8016684142a6a41096854d4e8a363d9a2f0bf87e56cb9cab9226548d2d16c6c9 |
| [41467_2020_17015_MOESM1_ESM.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC7316784.1/41467_2020_17015_MOESM1_ESM.pdf) | 953635 / 9页 | 6ead43d704a7faf7009abdc032bdc61b | cd067092288aa160c12c7927ee4f2381b58905a0c85a1877dacd463b6a383822 |

两文件独立无头Chrome实际200、%PDF、MD5与JSON匹配，SHA256/页数已核。只检查metadata与主PDF第一页题名/作者/DOI和摘要起始数行，**尚未读实验参数/方法/结果或SI正文、未视觉核图表、未查嵌入附件**，不称已精读或填任何性能值。原始文件暂存`/tmp/lens-mtf-audit/ndao2020-cloud-*`及`ndao2020-first-page.txt`，不提交全文，不操作用户Chrome资料/标签，不联系作者。

## 下一批具体核验

先按四步法读主文及SI：核结构/实际制成配置、口径/NA/设计f与介质，连续工作声明与实际测量λ；逐λ最佳焦位/参考面、残余轴向/横向色差，PSF/FWHM、Strehl/MTF与效率焦圈/功率分母。核数据获取/Source Data/作者仓库及附件嵌入文件，区分模型/实测/作者由实测计算/本库复算。若只有图，记录轴/图号/方向/缺采样/协议，不估曲线冒充原表。按真实谱点处理可见光筛选，不将跨波段声明当全部可见光实测。完成逐格录入、校验测试构建、PR/合并/Pages与独立无头Chrome验收再关本批；长期目标继续。

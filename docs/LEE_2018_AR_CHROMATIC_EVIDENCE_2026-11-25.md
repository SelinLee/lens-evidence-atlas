# Lee 2018 AR 目镜与分色共轭补偿

*Metasurface eyepiece for augmented reality*，Nature Communications 9, 4562 (2018-11-01)，DOI 10.1038/s41467-018-07011-5。2026-11-25 查询 Crossref 496、OpenAlex 586 次。作为独立的近眼显示研究维护，不进入消色差器件矩阵：其裸目镜本身有波长相关焦距，整机通过不同光路调节三个显示通道的共轭位置，而非让同一镜三色共焦。按一文献编号、两个系统配置、六个测量记录归组。[原刊](https://www.nature.com/articles/s41467-018-07011-5) · [Crossref](https://api.crossref.org/works/10.1038/s41467-018-07011-5) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1038/s41467-018-07011-5)

## 裸目镜

原刊 Fig. 2f–h（PDF p4）显示三个独立谱点的实测 x 向强度 PSF 半高宽，原图数字直接标注，非读图估值。口径 20 mm（pp4–5），原刊 p6 给三通道名义焦距及 NA。各谱点分别在其自身焦面测量，不能从共同面的图像质量推导消色差。

| 波长 (nm) | 名义焦距 (mm) | 作者 NA | 实测 x 向 FWHM (nm) | 原图 |
| ---: | ---: | ---: | ---: | --- |
| 660 | 12.9 | 0.61 | 780 | Fig. 2f |
| 532 | 16 | 0.53 | 533 | Fig. 2g |
| 473 | 18 | 0.49 | 507 | Fig. 2h |

几何校核：按空气中半径 10 mm 与名义焦距计算 sin(arctan(r/f)) 约 0.613、0.530、0.486，与作者 NA 一致。5.1 mm 名义焦距跨度不是作者实测轴向色差。实测轴向峰位及其不确定度未报告为数值。[正式 PDF Fig. 2](https://www.nature.com/articles/s41467-018-07011-5.pdf#page=4) · [三色焦距](https://www.nature.com/articles/s41467-018-07011-5.pdf#page=6)

补件 Note 7（PDF p9）为正常入射准直圆偏振、交叉偏振通道采集，100×、NA 0.7 接收物镜、管镜、CCD 与偏振元件。实际焦面 z 标定、横向像素尺度、曝光、归一化和原始二维 PSF 均未定位。Fig. 2i 是作者由实测 PSF 计算的 MTF 曲线，横轴空间频率 cycles/mm（0–4000），纵轴 MTF a.u.（0–1），参考虚线为蓝光理论基准；作者未报告切向、弧矢、径向平均或其他提取方向，未给数表，不能转换为近眼显示角频率 MTF 或 MTF50。补件 Note 11 解释 PB 相位镜焦距会随波长变化，红光 MTF 恶化。其图号引用为 Fig. 2g，原刊实际为 Fig. 2i。Fig. S12 的 532 nm、NA 0.61 带宽 0/20/40 nm 比较属于模型（实际绿色裸镜 NA 0.53）；Fig. S13 为以波长和半径作变量的模型，不能作为实测焦位或样片半径。[正式补件](https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41467-018-07011-5/MediaObjects/41467_2018_7011_MOESM1_ESM.pdf#page=9)

## 近眼原型

原刊 Fig. 3、Methods（pp6–8）三个二向色镜使不同颜色的中间图像对应各自名义焦距，目标共同虚像深度为 3 m；作者通过相机不同对焦深度显示虚实场景。实际三色残余轴向或横向注册误差未量化。Fig. 4b,c 实验展示红色 90° 与蓝色 76° 视场；作者 Fig. 4a 的绿色 83° 取模型，文中全彩共同 76° 按三色可用视场的最小值确定，非独立实测三色 FOV。方向未说明，不转为水平或对角 FOV。原型 eye relief 10 mm、eyebox 10 mm 是固定配置而不是独立测量的眼盒范围。系统 1% 测得效率未给清晰功率分母，不作为聚焦效率。没有系统 MTF、SNR、以共同面验证的多谱点 PSF 或原始色差数表。[原刊 Fig. 3](https://www.nature.com/articles/s41467-018-07011-5.pdf#page=6) · [Fig. 4](https://www.nature.com/articles/s41467-018-07011-5.pdf#page=7) · [Methods](https://www.nature.com/articles/s41467-018-07011-5.pdf#page=8)

## 数据原件核查

2026-11-25 本地独立无头 Google Chrome 取得正式 PDF，10 页 5,171,001 字节，SHA-256 `3559b24db3a25da629daad70e31203aa6895945367382b91e056d51c8954f862`，韩国大学机构版本完全同字节；正式补件 15 页 1,181,534 字节，SHA-256 `c49906f1aaa8d494d3ca2b30b6cbb76d45e5b276503bc7b9ee0d9bf1a563ba25`，两 PDF 无嵌入文件。期刊 HTML 有正式补件、视频及视频描述 DOCX，无 Source Data 栏。PMC 公共对象索引 11 件（正式 PDF、图版、补件、视频、DOCX、XML、文本与 JSON）；描述 DOCX 仅有视频说明且无嵌入附件。DataCite 与 Zenodo 按 DOI 查无关联数据条目，Europe PMC 的 XML 未获取；KAIST 机构入口未定位额外数据。原刊 p8 Data availability 说明可合理请求作者提供支撑数据；未发外部请求。故仅录三个图内原始 FWHM、明确的名义参数与系统 FOV；MTF 数值和残余色差字段空缺。

[机构 PDF](https://ipds.korea.ac.kr/sites/ipds/files/20220224_135719377_40951.pdf) · [PMC 文件索引](https://pmc-oa-opendata.s3.amazonaws.com/?list-type=2&prefix=PMC6212528) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1038%2Fs41467-018-07011-5%22) · [Zenodo](https://zenodo.org/api/records?q=%2210.1038%2Fs41467-018-07011-5%22)

# Wu 2025 可见光混合镜组的焦距变化与斜边 MTF

核验日期 2026-11-18。Peixuan Wu 等，Sensors 25(10), 3202，2025-05-20。入选依据是近期可见光实制镜组给出带内实测焦距变化及全场斜边 MTF。按 DOI 去重，纳入同一主文、期刊原始补件和数据检索。选文未使用引用量或影响因子。[正式全文 XML](https://www.ebi.ac.uk/europepmc/webservices/rest/PMC12115752/fullTextXML) · [期刊正式 PDF](https://mdpi-res.com/d_attachment/sensors/sensors-25-03202/article_deploy/sensors-25-03202.pdf)

## 口径、焦距与测量范围

整组由五片球面折射镜、末端 SiNₓ 相位校正片和 IR 滤镜组成。名义有效焦距为 4.13 mm、F/2、光学总长 22.29 mm。超表面自身的 5.79 mm 口径、700 nm 柱高、340 nm 周期与 110–240 nm 柱直径由 p3 §2 和 Fig. 2d–f 支持。补表 S2 的 R=1 mm 是相位多项式归一化半径。分别保存校正片和整组，整组实际入瞳及 NA 留空。[主文 pp2–5](https://mdpi-res.com/d_attachment/sensors/sensors-25-03202/article_deploy/sensors-25-03202.pdf#page=3) · [补件，Tables S1–S2](https://mdpi-res.com/d_attachment/sensors/sensors-25-03202/article_deploy/sensors-25-03202-s001.zip)

作者在 460–656 nm 内把单色器输出经匀光、针孔和消色差准直后送入样机，CMOS 像面像素间距 3 μm。§3 与 Fig. 4a–b 给出带内焦距变化 **约 50 μm**。作者以 4.13 mm 名义焦距为分母报告 **约 1.2%**，量纲复核 50/4130 ≈ 1.21%。Fig. 4b 的横轴为波长（nm），纵轴为焦距（mm），九个蓝色数据标记叠加红色拟合曲线。逐点数表、误差棒定义、轴向步长和焦位具体参考面尚缺，实测逐点焦距及有符号焦差留空。摘要称 400–700 nm，精确设计与焦距表征范围沿 §2–3 保留为 460–656 nm。[主文 p5 Fig. 4](https://mdpi-res.com/d_attachment/sensors/sensors-25-03202/article_deploy/sensors-25-03202.pdf#page=5)

## 实拍斜边与模拟 S/T

| 评价频率 (lp/mm) | 整个成像场的作者平均 | 作者所称最大测量场点 |
| ---: | ---: | ---: |
| 100 | 0.63 | 0.364 |
| 167 | 0.24 | 0.161 |

四个数值来自主文 p6 §3 多色 MTF 段，按原文印字保存。补件 Note S1 用棋盘倾斜边缘提取 ESF（edge spread function），求导得 LSF（line spread function），再傅里叶变换得到 MTF（modulation transfer function）。Fig. 4d 只画两组频率随入射角变化，横轴为入射角（°），纵轴为无量纲 MTF。场平均的样本和权重、最大场点精确角度、S/T 或边缘取向、频率参考面、DC 归一化与光谱加权待核。正文最大场点在 167 lp/mm 为 0.161，摘要关于所有场角的高于 0.2 声明范围大于该实测结果。论文独立用 90 mm 靶距和超过 218 mm 可辨对角跨度报告约 100° 全视场，未把该全角换算为最大 MTF 场点。[主文 pp5–6](https://mdpi-res.com/d_attachment/sensors/sensors-25-03202/article_deploy/sensors-25-03202.pdf#page=6) · [补件 Note S1](https://mdpi-res.com/d_attachment/sensors/sensors-25-03202/article_deploy/sensors-25-03202-s001.zip)

Fig. 2a 的校正后设计和 Figs. S1/S2 的原折射组、移除校正片后再聚焦两类对照为光线追迹。主图图例印 0°、28°、42°、56°、73°、100°，两张补图印 0°、14°、21°、28°、36°、50°。每组实线 T、虚线 S，频率轴为 lp/mm。保留原图角度标签，没有把两组角度自动换算或据图估填数值。Fig. 2a 图注称模拟用五个波长，五个中心值、加权和逐频数表缺证。Fig. 5 的 0.5–4 m 彩色实拍依图注各记一行，作者说明无计算校正，显示用色卡经过等尺寸缩放。图像未给定量通道位移。[主文 Figs. 2、5](https://mdpi-res.com/d_attachment/sensors/sensors-25-03202/article_deploy/sensors-25-03202.pdf#page=4) · [补件 Figs. S1–S5](https://mdpi-res.com/d_attachment/sensors/sensors-25-03202/article_deploy/sensors-25-03202-s001.zip)

## 数据边界与交付

正式 PDF 9 页、4,106,360 字节，SHA256 `f9087b56ddca05703da7eb1359831d86808c2683b2804269bae92547c1797a8a`。期刊 HTML 补件下载入口在本次访问返回 403，官方静态文件 `sensors-25-03202-s001.zip` 实际返回 200，759,035 字节，SHA256 `af8ca377596a58763c05e0bbaa19a1d70ccc368fbb568c80340986ecb898ea81`。其中只有 `sensors-3582553-supplementary.pdf`，780,724 字节，SHA256 `bcdab38f89aaca1fb417528c25aef1c58a1fd4e72b78342628756a1bcdacd289`。主文和补件 PDF 均无嵌入附件，作者在 p8 Data Availability 称证据包含于论文和补件。Europe PMC 全文 XML 只列同一 ZIP，DataCite 关联 DOI 零条。按题名、DOI 和作者搜寻代码、GitHub、Zenodo、Figshare，未取得原始焦扫、棋盘斜边图、PSF 或逐频表。Strehl 与聚焦效率缺证。所读图只保存原标签与作者正文报告值。[正式主文 p8](https://mdpi-res.com/d_attachment/sensors/sensors-25-03202/article_deploy/sensors-25-03202.pdf#page=8) · [官方补件](https://mdpi-res.com/d_attachment/sensors/sensors-25-03202/article_deploy/sensors-25-03202-s001.zip) · [DataCite 关联查询](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.3390%2Fs25103202%22&page%5Bsize%5D=25)

全批新增同一研究的 18 条证据记录、8 个配置。整组的焦位、斜边、棋盘视场和多物距采集沿用同一实物。后续优先追踪 Park 2026 的裸校正元件及混合整组 MTF 口径，继续查 Zhang 2025 和 Feng 2022 作者存档。[Park 2026](https://doi.org/10.1021/acs.nanolett.6c02688)

# Balli 2020 的 100 μm 空气间隔消色差器件

Balli、Sultan、Lami 和 Hastings 的 *A hybrid achromatic metalens* 发表于 *Nature Communications* 11, 3892，2020-08-04。2026-11-19 查 Crossref 221 次、OpenAlex 251 次。该研究符合经典文献条件，并在相位板和经色散优化的纳米柱超表面实物上实测轴向焦差。两薄元件的色散响应由递归光线追迹设计，在两端设计波长将光聚向同一目标焦面。两光学元件间的空气间隔为增加光焦度提供自由度。[正式主文](https://doi.org/10.1038/s41467-020-17646-y) · [Crossref](https://api.crossref.org/works/10.1038/s41467-020-17646-y) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1038/s41467-020-17646-y)

核用户指定参考库的正式主文 pp.5–7、作者预印本 v1 的结果与讨论、出版社补充材料 Notes 2–3、5 及工作簿。正式主文 p.6 Discussion 与补件 p.5 Fig. S4 确认此处为空气间隔 HAML 实物。其 EPD 为 100 μm，名义 NA 为 0.24。补件 Note 3 给分离距离 7 μm，定义为第一薄元件最高点至第二薄元件底层。另有相同 NA 和 EPD 的参考文献 15（Shrestha 2018），其数据归另一研究。早期预印本中出现这组几何是讨论所引对照研究的条件。此器件的绝对设计焦距未找到直报。[补件 Fig. S4](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-020-17646-y/MediaObjects/41467_2020_17646_MOESM1_ESM.pdf#page=5) · [作者预印本 v1](https://arxiv.org/abs/1909.07941v1) · [参考文献 15](https://doi.org/10.1038/s41377-018-0078-x)

## 九个实测谱点

出版社工作簿 `41467_2020_17646_MOESM3_ESM.xlsx`。波长行分别为 `Supplementary Figure 4-a!D5:L5`、`4-b!D6:L6` 和 `4-c!D5:L5`。三张表的样品标签均为 100 μm。Fig. S4 三子图横轴均为 Wavelength (nm)。纵轴依次为 FWHM (μm)、Focusing Efficiency (%) 和 Focal Length Error (%)。下列数值来自对应工作表的数值行。[出版社 Source Data](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-020-17646-y/MediaObjects/41467_2020_17646_MOESM3_ESM.xlsx)

| 波长 (nm) | FWHM (μm)，4-a 第 6 行 | 效率 (%)，4-b 第 7 行 | 有符号归一化焦距误差 (%)，4-c 第 6 行 | 列 |
| --- | ---: | ---: | ---: | --- |
| 1000 | 3.09 | 15.12 | +4.79 | D |
| 1100 | 3.18 | 12.90 | +2.89 | E |
| 1200 | 3.15 | 18.25 | +0.90 | F |
| 1300 | 3.03 | 17.49 | −0.29 | G |
| 1400 | 3.27 | 19.26 | 0 | H |
| 1500 | 3.51 | 20.00 | −1.15 | I |
| 1600 | 3.63 | 20.54 | −3.49 | J |
| 1700 | 4.00 | 19.18 | −4.14 | K |
| 1800 | 4.48 | 21.55 | −4.77 | L |

正文 p.7 Optical testing 和补件 Fig. S6 采用轴上准直超连续照明。1000、1100 nm 由长通和带通滤片得到，其他实测谱点由声光滤波器选取。40×、NA 0.55 物镜和筒镜将焦面转接至近红外相机，透镜沿轴扫描，通常 2 μm，焦距误差为 0.5 μm。作者用针孔的逐色 Airy 拟合标定继像光路的色差。实际 FWHM 方向、逐色选面细节、偏振与横向采样仍缺。Fig. S4a 的焦斑点采用工作表的样品实测行，图中的衍射参考线另有图示。[正式主文 p.7](https://www.nature.com/articles/s41467-020-17646-y.pdf#page=7) · [补件 Fig. S6](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-020-17646-y/MediaObjects/41467_2020_17646_MOESM1_ESM.pdf#page=7)

1400 nm 的零值沿用工作簿原值。作者的 4.8% 汇总与原表最大绝对值 4.79% 的舍入量级吻合。原文未给参考焦位、归一化分母或计算式。表中百分数的最大值与最小值相差 9.56 个百分点，为本库对源表数列的计算。绝对轴向焦位、物理焦差和横向色差均待补。主文 Fig. 4e 四个实物的 36 个已有谱点同时补录原表有符号百分数，保持 Fig. S2 比较所用的另一套序列各自归属。[正式主文 Fig. 4e 与 Discussion](https://www.nature.com/articles/s41467-020-17646-y.pdf#page=5) · [出版社 Source Data](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-020-17646-y/MediaObjects/41467_2020_17646_MOESM3_ESM.xlsx)

效率分子为焦面半径 1.5×FWHM 圆内积分功率，分母为熔融石英入射面与镜片同等孔径面积内的总入射功率。作者报告最大 22% 和平均 19%，平均的采样集合与权重未说明。九个已发布值的最大值为 21.55%，本库按九个波长等权复核的算术平均为约 18.25%。保存作者原述与独立计算的口径。[主文 pp.6–7](https://www.nature.com/articles/s41467-020-17646-y.pdf#page=6) · [补件 p.5](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-020-17646-y/MediaObjects/41467_2020_17646_MOESM1_ESM.pdf#page=5)

## 材料与缺口

- 出版社工作簿 28046 字节，SHA-256 为 `68e0c5ac631c11b60232946a1f68f8ea7e251a039e5415dae53c6e54e12d47b1`。补充材料 15088926 字节，SHA-256 为 `14724c9d1519e14addfa5bf8c65fc996e5fa6fb3215935f148e515182350f29a`。与主文统一用一个文献编号。
- Data availability 指向补件、Source Data 及向作者提出合理请求。工作簿与 Fig. S4 只给所列结果，此配置的二维 PSF、逐频 MTF、Strehl、相机采样与绝对峰位待补。
- DataCite 精确 DOI 关联只有作者预印本。UKnowledge 的作者学位论文 *Optical Metasurfaces* 馆藏页可访问，全文下载在独立无头 Chrome 返回 403。[数据检索](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1038%2Fs41467-020-17646-y%22) · [学位论文馆藏](https://uknowledge.uky.edu/physastron_etds/81/)

## 2026-11-23 主文汇总与补件实验序列

从用户指定参考目录的正式 PDF p.5 复核 Fig. 4a、4e 图注与 Experimental results。图注给 20 μm 一体镜的图示焦面距镜片 34.5 μm，镜片位于 z=0。九个波长的各自轴向峰位与横向帧选面仍待核。p.7 的常规轴扫步进为 2 μm，焦距误差测量改用 0.5 μm，并用针孔逐色标定继像色差。[正式 PDF pp.5,7](https://www.nature.com/articles/s41467-020-17646-y.pdf#page=5)

| 配置 | 正文报告焦距最大变化或误差 | 源表有符号范围 | 本库复算极差（百分点） | 工作簿 |
| --- | ---: | ---: | ---: | --- |
| 一体式 20 μm，NA 0.27 | 8.6% | −6.78% 至 +3.42% | 10.20 | `Figure 4e!D7:L7` |
| 一体式 40 μm，NA 0.11 | 8.2% | −4.51% 至 +3.76% | 8.27 | `Figure 4e!D8:L8` |
| 一体式 80 μm，NA 0.06 | 5.4% | −2.06% 至 +3.37% | 5.43 | `Figure 4e!D9:L9` |
| 空气间隔 40 μm，NA 0.32 | 8.1% | −2.78% 至 +5.41% | 8.19 | `Figure 4e!D10:L10` |
| 空气间隔 100 μm，NA 0.24 | 4.8%，Discussion | −4.77% 至 +4.79% | 9.56 | `Supplementary Figure 4-c!D6:L6` |

复算对同一表列九个百分数做最大值减最小值。报告数字与复算均各自保留出处。20 μm 镜的 Discussion 另称相对平均焦距小于 4.8%，归一分母、绝对焦面和与 p.5 汇总的对应未说明。工作簿的 1400 nm 列各样品均印零，百分数不据此换算成微米。[正式主文 pp.5–7](https://www.nature.com/articles/s41467-020-17646-y.pdf#page=5) · [出版社 Source Data](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-020-17646-y/MediaObjects/41467_2020_17646_MOESM3_ESM.xlsx)

补件 pp.2–3 Note 2、Fig. S2a–d 对 20 μm／NA 0.27 的设计给出另一组实验和 FDTD 结果。已录九条实验行，沿用同一器件配置和研究编号。原文未另标物理样片编号。对应的 `Experiment` 行分别为 `Supplementary Figure 2-b!D6:L6`、`Supplementary Figure 2-c!D7:L7`、`Supplementary Figure 2-d!D24:L24`。这三张表给 2.21–3.67 μm 横向 FWHM、38.71%–78.07% 聚焦效率及 +2.85% 至 −6.05% 有符号焦距误差，极差为 8.90 个百分点。例如，1800 nm 的补件宽度为 3.67 μm，主文工作表为 4.3 μm。实验条目标明所用的图表。效率沿用主文焦面圆半径 1.5×FWHM、同孔径石英入射面的分母定义，补件未列独立功率校准及逐色重复数。原始相机 PSF、逐色绝对焦位、物方采样和横向色差仍待核。[补件 Fig. S2](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-020-17646-y/MediaObjects/41467_2020_17646_MOESM1_ESM.pdf#page=3)

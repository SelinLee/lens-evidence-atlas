# Ren 2022 光纤端面消色差器件与玻璃对照

Haoran Ren 等，*Nature Communications* 13, 4183，2022-07-19 正式发表。2026-11-19 查 Crossref 226 次、OpenAlex 258 次引用，按经典研究纳入。本文实物以三维 IP-L 纳米柱的高度、几何和取向匹配相位与群延迟。玻璃基底样片用同尺寸、同球面相位的未校正器件对照。光纤样片额外补偿 SMF-28 模式的发散波前。两类消色差器件在 1250–1650 nm 工作，正式实测焦斑表有五个具体谱点。[正式主文](https://www.nature.com/articles/s41467-022-31902-3.pdf) · [Crossref](https://api.crossref.org/works/10.1038/s41467-022-31902-3) · [OpenAlex](https://api.openalex.org/works/W4221139744)

## 焦位与成像

- 平面玻璃两只实物的名义直径均为 100 μm，NA 0.2，1650 nm 名义设计焦距 250 μm。主文 p6 直报消色差实物在 1650 nm 为 225 μm，相对同段名义设计面的 −25 μm 为本库差值。Fig. 3B–C 显示五谱点接近共焦，逐谱点剩余差与误差无数表。未校正实物的正文明确写 1650 nm 为 225 μm、1250 nm 为 306 μm，相减为 81 μm。Fig. 3F 的 XZ 扫描支持正文的方向，Fig. 3E 红轴曲线则随波长增长而上升。保存正文值与冲突，数值焦位栏留空。没有用曲线估读填数。[原文 pp3、5–6](https://www.nature.com/articles/s41467-022-31902-3.pdf#page=5)
- 光纤端面实物的有效 NA 为 0.12，空心支架高 525 μm、直径 120 μm。100 μm 是镜的名义直径。Fig. 4D–E 的焦位曲线接近水平，图及其对应正文无逐点数表和数值残差。光纤扫描步长 0.5 μm，范围 300 μm。这个步长适用于 p6 光纤测量，玻璃测量步长待核。Fig. 5E/F 的实拍共焦对照在 1250、1450、1650 nm 逐列可查。Fig. 5H 是八通道共焦实拍，作者以 USAF G6E5 的 4.92 μm 标记系统分辨率，对比阈值未给。[原文 pp6–8](https://www.nature.com/articles/s41467-022-31902-3.pdf#page=7)
- Fig. S11 的 NA 0.21 未校正模型在 1250、1350、1450、1550、1650 nm 的图内印字分别为 292、271、258、237、217 μm。Fig. S12A/B 在 1650 nm 比较 22 nm 与 2200 nm 两种采样周期，光纤端面分别标 450、410 μm，玻璃分别标 250、225 μm。均按模型另列。SI Note 7 的另一个 240 μm 采样敏感性模型也有自己的参数和效率口径。[补件 pp30–31](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-022-31902-3/MediaObjects/41467_2022_31902_MOESM1_ESM.pdf#page=30) · [作者答复 2.2](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-022-31902-3/MediaObjects/41467_2022_31902_MOESM2_ESM.pdf)

## 数表与效率定义

| 波长（nm） | 玻璃消色差镜实测 FWHM（μm） | 光纤消色差镜实测 FWHM（μm） | 玻璃消色差镜总效率（%） | 玻璃未校正镜总效率（%） |
| --- | ---: | ---: | ---: | ---: |
| 1250 | 3.03 | 4.97 | 14.13 | 20.11 |
| 1350 | 3.83 | 5.45 | 18.11 | 24.58 |
| 1450 | 3.79 | 5.81 | 24.58 | 27 |
| 1550 | 3.84 | 6.27 | 30.87 | 30.1 |
| 1650 | 4.24 | 6.74 | 32.01 | 30.96 |

FWHM 对应 Tables 4 与 6 的 Experiment 列，对照的 Simulation 列作为同波长参考保留在格注。表中横向截面方向、拟合方法和误差未给。Tables 3 与 5 同时报告透过率、透射强度归一的聚焦效率，以及两比值之积。透过率分母为作者所称总入射光强，入射积分面积未交代。聚焦效率的圆孔按 3×FWHM 描述，半径或直径未指定。总效率逐点沿用作者印字。用已印各因子重乘结果的最大绝对差是 0.0371 个百分点，受表中有效位数限制。光纤端面样片无这组实测效率数表。[补件 pp41–44 Tables 3–6](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-022-31902-3/MediaObjects/41467_2022_31902_MOESM1_ESM.pdf#page=41)

## 原始数组核查

本机独立无头 Google Chrome 取正式主文、两份附件与期刊更正。附件文件名 `41467_2022_31902_MOESM1_ESM.pdf` 是 45 页补充材料，`41467_2022_31902_MOESM2_ESM.pdf` 是公开评审记录。正式论文的 Data availability 指向通讯作者。期刊正文附件入口未列独立数表或像素文件。按正式 DOI 搜索 DataCite 只有同研究 arXiv 版本，Zenodo 精确题名搜索零项。原始 PSF 数组、横向像素采样、焦位重复测量、不确定度、MTF 与 Strehl 未取得，相关数值留空。[期刊材料](https://www.nature.com/articles/s41467-022-31902-3#Sec13) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1038%2Fs41467-022-31902-3%22) · [更正](https://www.nature.com/articles/s41467-022-32153-y)

| 本机核验文件 | SHA-256 |
| --- | --- |
| `s41467-022-31902-3.pdf` | `4022a9f4d335ed7ea97c6c2041d0ae91e27cd7018e787abbea6cfb19f45766bd` |
| `41467_2022_31902_MOESM1_ESM.pdf` | `952244b7dc829788a5522130046e185ea0ee7258413d6f6e3753eda24ab33a62` |
| `41467_2022_31902_MOESM2_ESM.pdf` | `4ae28e6fb9b1c8f4bf424e078b25641590222df66c5aeae0811e7599dd113d4e` |
| `s41467-022-32153-y.pdf` | `633471d3a77185d44bfdef68f6fbbe59d95fdbbecbeb8c14e9158ddb57116e0a` |

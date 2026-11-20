# Chen 2025 太赫兹梯度折射率超透镜

Jin Chen、Shao-Xin Huang 等，*Nature Communications* 16, 363，2025-01-03，DOI `10.1038/s41467-024-55624-w`。按 2025 年 3 月中科院综合性期刊大类一区和实物光学补偿证据纳入。作者用十个径向分区形成折射率梯度，纠正有限厚度引起的光线偏离。0.2–0.9 THz 是连续设计区间，实测为 0.1 THz 间隔的八个离散频点。图 Fig. 3b 的强峰接近共同参考面，作者审稿答复明确承认各频点的最佳焦位之间存在小差异。该实验属于太赫兹范围。[正式主文](https://www.nature.com/articles/s41467-024-55624-w.pdf) · [Fig. 3](https://pmc-oa-opendata.s3.amazonaws.com/PMC11699036.1/41467_2024_55624_Fig3_HTML.jpg) · [2025 年 3 月分区](https://www.goingpub.com/journal_detail/228.html) · [广州中医药大学图书馆分区](https://library.gzucm.edu.cn/ziranzhishufenxibaogao2025.3.pdf)

## 归组与测量参考

- 单镜名义直径 6 mm、厚 1.5 mm、设计焦距 4.5 mm、几何 NA 0.555。主文 p3 的 Eq. 2–4 和审稿答复 Reviewer 2 问题 5 明确坐标。镜片入射侧基面为 z=0，出射侧为 z=1.5 mm，图内虚线 z=6 mm 相对出射面为 4.5 mm。半径 3 mm 与名义轴距 4.5 mm 对应 `sin(arctan(3/4.5))≈0.555`。补件 Table S1 列打印结构参数。实际逐频焦位不填图中参考面数值。
- 正入射 Fig. 3b 为 x–z 场，(d) 是虚线处的 x 横切。Fig. S11 是 x–y 功率图，轴为 mm，色标为归一化功率。Methods 的二维接收台步进 0.1 mm 归光场测量。各频点绝对最佳焦位、插值方法和误差留空；作者给出的约 (0.8lambda) 是宽度概述。Fig. 3f 的实测 FWHM 随频率曲线未见逐点原数。0.2 THz 是作者明确指出超出 Abbe 宽度参考线的点。
- 斜入射 Fig. 3c,e 对同一单镜逐一比较 0.5、0.6、0.7 THz 和 15°、30°、45°。Fig. 3e 横向偏移以实验光轴 x=0 为参考，包含不同场角的移动。固定场点跨频的残余横向色差尚无精确数表。Fig. S13 给实验台坐标的 x/y 两向宽度曲线。Fig. S12 则沿与局部传播轴 v 垂直的 u 轴取宽。
- 双透镜系统分别登记 0.7 THz 正入射共焦成像，以及三入射角的离轴成像。审稿答复 Reviewer 2 问题 7 报告原配置以 0.1 mm 步长扫描正、负标靶，约 0.2 mm 线纹可分辨；旋转对照采用 0.2 mm 步长。作者指出偏振会影响两方向线纹的清晰度。Fig. 5 中 15°／30° 的 SNR 高于 10 dB，45° 低于 10 dB，保留界限和 90° 全角的作者定义，精确 SNR 留空。

[正式补件 DOCX](https://pmc-oa-opendata.s3.amazonaws.com/PMC11699036.1/41467_2024_55624_MOESM1_ESM.docx) · [审稿答复 PDF](https://pmc-oa-opendata.s3.amazonaws.com/PMC11699036.1/41467_2024_55624_MOESM2_ESM.pdf)

## Fig. S12 图内精确印字

以下为作者印在九个子图内的无量纲 FWHMᵤ。数据库以 `λ₀=299.792458/f(THz) μm` 换算到最近 1 μm 并保留原系数。u 轴结果不填入实验台的 x/y 焦斑列。括号内为本库换算值。

| 实测频率 | 15° | 30° | 45° |
| --- | --- | --- | --- |
| 0.5 THz，第 1 行 | 0.799λ（479 μm） | 0.796λ（477 μm） | 0.715λ（429 μm） |
| 0.6 THz，第 2 行 | 0.745λ（372 μm） | 0.955λ（477 μm） | 0.935λ（467 μm） |
| 0.7 THz，第 3 行 | 0.994λ（426 μm） | 1.002λ（429 μm） | 0.637λ（273 μm） |

## 效率与原始数据

Fig. 3f 上半图是对照曲线。主文 p3 定义 Fig. 2e 理论效率的焦面积分圈直径为 3×FWHM，实测效率的窗口和功率分母未核。p6 叙述 0.8、0.9 THz 实测低于理论，但 Fig. 3f 的实测红点在理论蓝点上方。数据库保留冲突定位，实测效率留空。未核到可计算逐频轴向色差的最佳焦位数表，也未核到原始 PSF 场阵列、MTF 或 Strehl 数据。论文的数据声明指向主文和补件，DataCite 的精确关联 DOI 查询为零。[正式 Fig. 3](https://pmc-oa-opendata.s3.amazonaws.com/PMC11699036.1/41467_2024_55624_Fig3_HTML.jpg) · [数据声明](https://pmc.ncbi.nlm.nih.gov/articles/PMC11699036/) · [DataCite 查询](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1038%2Fs41467-024-55624-w%22)

本机独立无头 Chrome 已取得正式主文、Fig. 3、DOCX 和作者审稿答复。DOCX 的 SHA-256 为 `c0b618b9fa91873aa1887413d2dc42346f966197410f8220eacdde5ce87553ec`，审稿答复为 `9a9f7d04d34f2e0fb9a0c7e66a6383fb4059f2e81033e9717294cb2d8281cb83`。按 DOCX 图注与关系表定位 Fig. S11–S13 的内嵌图，视觉核对了轴标、数据归属和 Fig. S12 的九个数值。

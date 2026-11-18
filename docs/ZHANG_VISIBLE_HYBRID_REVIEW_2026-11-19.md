# Zhang 2025 的 8 mm 可见光消色差折超混合镜

Qiangbo Zhang、Peicheng Lin、Zeqing Yu 等，*Laser & Photonics Reviews* 19(24), e00448，DOI 10.1002/lpor.202500448，2025-07-26 正式上线。期刊在 2025 年中科院升级版属物理与天体物理大类一区。本批纳入实制混合镜与单非球面的波长对照，以及有明确模型和处方的模拟比较。所读材料包括期刊摘要、数据声明、Wiley 出版预览第 1 页、Fig. 2–4 的原刊图注和作者代码。全文、补件及图版原图直连受限。[Wiley](https://onlinelibrary.wiley.com/doi/10.1002/lpor.202500448) · [原刊公开预览](https://www.researchgate.net/publication/394026954_Vectorial_Generalized_Snell%27s_Law-Enabled_Differentiable_Ray_Tracing_for_Large-Aperture_Visible_Achromatic_Hybrid_Meta-Optics) · [Crossref](https://api.crossref.org/works/10.1002/lpor.202500448) · [武汉大学图书馆分区](https://topj.lib.whu.edu.cn/show.asp?cat=sci&id=13647) · [分区版本](https://www.ais.cn/journal/database/5537)

## 实物和原位图注

| 原文位置 | 已核内容 | 待核 |
| --- | --- | --- |
| 摘要及 p1，Fig. 2c，Fig. 3a–c | 混合镜名义口径 8 mm、NA 0.32；非球面折射镜与超透镜实物、SEM 和支架组装。设计单元 P=350、H=800、L=290、W=100 nm。 | 两实物有效口径和 NA 的独立计量、实际结构厚度、材料和实验处方。 |
| Fig. 3d | 单非球面和混合镜的纵向透射强度，图注波长范围 420–680 nm。白虚线为设计焦位。 | 各波长标签、量纲、参考零点、位移台步长、逐波长峰位和不确定度。 |
| Fig. 3e、3g | Fig. 3e 给设计焦面横向强度，Fig. 3g 报焦斑半能量宽度（HEW）。 | HEW 的半径/直径定义、积分边界、原轴、焦斑图采样和处理条件。 |
| Fig. 3f | 两装置的实验焦距随波长变化。 | 焦距纵轴单位与逐点值、焦移定义、参考波长、摘要 83% 的计算条件。 |
| Fig. 4a–b | 两装置分别实拍 USAF 1951，含宽带白光及 460、500、550、600、640 nm 五个单色照明。 | 靶的组与元素、线宽阈值、原始图像、相机处理、物距、场点和逐频 MTF。 |

Fig. 3d 的实验覆盖范围和 Fig. 4 的具体照明谱点各按其图注记录。从可读图注可确认图中测量量，坐标轴的物理零点、线图纵轴单位和各点数值均待原图。摘要的 83% 是作者相对单非球面报告的色差改进，完整指标和分母待核。[Fig. 2](https://www.researchgate.net/figure/Ray-tracing-configuration-and-optimization-results-for-the-hybrid-metalens-a-Schematic_fig2_394026954) · [实验 Fig. 3](https://www.researchgate.net/figure/Experimental-characterization-results-of-the-hybrid-metalens-and-the-single-aspheric_fig3_394026954) · [标靶 Fig. 4](https://www.researchgate.net/figure/Comparison-of-imaging-performance-between-the-single-aspheric-lens-and-the-hybrid_fig4_394026954)

## 设计处方与本库复算

作者仓库固定提交 `2a5d4ecb157af59e733b4d2e7660f95938a36cdf`。`hybrid_optimize/results/Optimize_Geometric_hybrid_achromatic/optimized_lens.mat` 与 `generate_h5file/optimized_lens.mat` 两份 936 字节文件逐字节相同，SHA256 为 `449c7655607863ee4413ed36fa53870f998e511fb3d895582261cd3ca900f294`。`meta_radius[1,1]` 为 4 mm，`meta_period[1,1]` 为 0.00035 mm（350 nm）。`meta_ai[1,1:8]` 与 `lens_1_c`、`lens_1_k`、`lens_1_ai`、`lens_2_c` 是优化参数；对应脚本只加载处方。设计优化使用 420–680 nm 间隔 20 nm 的 14 谱点，损失包含固定像面横向项和射线与光轴交点的轴向项。[处方 MAT](https://github.com/Qiangbo100/DeepHybridMetalens/blob/2a5d4ecb157af59e733b4d2e7660f95938a36cdf/hybrid_optimize/results/Optimize_Geometric_hybrid_achromatic/optimized_lens.mat) · [优化脚本](https://github.com/Qiangbo100/DeepHybridMetalens/blob/2a5d4ecb157af59e733b4d2e7660f95938a36cdf/hybrid_optimize/Optimize_Geometric_hybrid_achromatic.py#L25-L100)

比较脚本以轴上入射、201×201 网格、3.99 mm 采样半径模拟两模型，名义模型孔径均为 8 mm。固定模型传感器坐标 z=16 mm；这是全局模型坐标，实际几何或光学焦距仍待正文核对。模型筛掉无效光线，以固定面光轴为参考计算交点的 `sqrt(mean(x²+y²))`。本库在 Apple Silicon CPU 运行该作者脚本，PyTorch 2.7.1、SciPy 1.15.3，保留 420–680 nm 间隔 10 nm 的 27 谱点。数据库每个谱点定位到 `hybrid_RMS` 或 `single_RMS` 的对应输出索引，显示保留四位小数。[比较脚本 L26–108](https://github.com/Qiangbo100/DeepHybridMetalens/blob/2a5d4ecb157af59e733b4d2e7660f95938a36cdf/hybrid_optimize/Load_optimized_Geometric_hybrid_vs_SingleLens.py#L26-L108) · [落点计算 L752–769](https://github.com/Qiangbo100/DeepHybridMetalens/blob/2a5d4ecb157af59e733b4d2e7660f95938a36cdf/diffoptics/optics.py#L752-L769)

两模型在 420 nm 的几何 RMS 半径分别约 13.6655 μm 和 52.5105 μm。两组 27 点算术平均约 4.0550 μm 和 22.8022 μm，按 `1−混合均值/对照均值` 算得 82.22%。该算式比较固定面几何 RMS 半径，摘要的 83% 仍按作者原述登记。模型未引入衍射强度、实际入射能量或焦圈积分。Fig. 3g 实验 HEW 随实物单独记录。[作者比较脚本](https://github.com/Qiangbo100/DeepHybridMetalens/blob/2a5d4ecb157af59e733b4d2e7660f95938a36cdf/hybrid_optimize/Load_optimized_Geometric_hybrid_vs_SingleLens.py#L33-L51) · [期刊摘要](https://onlinelibrary.wiley.com/doi/10.1002/lpor.202500448)

## 原始数据入口

Wiley 数据声明可向作者合理请求。检查了全文网页、PDF、1.8 MB 补件 `lpor70234-sup-0001-SuppMat.pdf` 的期刊入口和公开预览图版。前述期刊文件在独立无头 Chrome 返回 403，公开预览的索引可以读取原刊图注。作者仓库公开处方与模型输出图，DataCite 精确关联 DOI 返回零项。本批缺失逐波长焦距数表、可标定 PSF、实测 MTF、Strehl 和焦区功率记录。原始数组与实测数值未获，质量字段留空。[数据声明](https://onlinelibrary.wiley.com/doi/10.1002/lpor.202500448) · [期刊补件](https://onlinelibrary.wiley.com/action/downloadSupplement?doi=10.1002%2Flpor.202500448&file=lpor70234-sup-0001-SuppMat.pdf) · [作者仓库](https://github.com/Qiangbo100/DeepHybridMetalens/tree/2a5d4ecb157af59e733b4d2e7660f95938a36cdf) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1002%2Flpor.202500448%22&page%5Bsize%5D=25)

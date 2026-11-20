# Chen 双波长消色差单原子光镊

Guang-Jie Chen 等，*Multifunctional Metalens for Trapping and Characterizing Single Atoms*，DOI `10.1002/lpor.202401595`。首次正式在线为 2024-12-24，卷期为 2025 年 19(6)，文章号 2401595。沿 Hsu 2022 后续引用定位，核 2025 年 3 月中科院分区升级版物理与天体物理大类一区。入选依据是 780／852 nm 光学共焦设计、同一镜片实物的两色焦斑及单原子实验。两点均为离散通道，780 nm 是本库可见光筛选的上限。[正式论文](https://doi.org/10.1002/lpor.202401595) · [2025 年分区](https://www.ais.cn/journal/database/5537) · [作者稿](https://arxiv.org/pdf/2411.05501v1)

中科大作者主页公开托管九页 Wiley 正式 PDF。独立无头 Chrome 取得 1302629 字节，SHA-256 `634666830dba66fbfb7287386ba52f34acb33ed74577dee408fc3e2625e3fb9c`。正式 Fig. 2、Fig. 3 与作者稿逐图对照，数值采用正式版。正式 p.4 §2.1 将实测 YZ 平面强度分布指向补件，p.3 将效率测量光路也指向补件。这两处指引在作者稿中缺失。[正式 PDF](https://faculty.ustc.edu.cn/_resources/group1/M00/00/7D/wKhJFWj7g4KAb0luABPgZZBxqqQ382.pdf) · [作者主页](https://faculty.ustc.edu.cn/huangkun/zh_CN/zdylm/739938/list/index.htm)

## 器件和焦位

- 正式 PDF p.2 §2.1、Fig. 2a,b 报告实制圆形口径 2 mm、约 10 mm 方形蓝宝石基片和 600 nm 单晶硅结构。以两类纳米砖分别为 780 nm 和 852 nm 编码相同目标面的相位，兼具偏振选择。p.4 设计 NA 0.46，横向焦斑与 NA 0.40 物镜的聚焦能力相近，轴向表现以等效 NA 0.28 描述。Fig. 3 中用于比较的常规物镜也是 NA 0.28，身份和测量条件独立。[Fig. 2](https://faculty.ustc.edu.cn/_resources/group1/M00/00/7D/wKhJFWj7g4KAb0luABPgZZBxqqQ382.pdf#page=3) · [表征段](https://faculty.ustc.edu.cn/_resources/group1/M00/00/7D/wKhJFWj7g4KAb0luABPgZZBxqqQ382.pdf#page=4)
- p.4 §2.2 与 p.5 Fig. 3 插图用 780 nm 探测束激发背景铷原子，侧视荧光显示焦点约在芯片表面上方 **2.6 mm**。p.5 的 **3 mm** 是制备冷原子云的位置。两束准直后按作者描述聚焦到同一位置，缺少独立报告的 852 nm 峰位和成对轴扫，残余焦差待核。正式 Fig. 3 图注确认 2.6 mm 的通道与参考面。[正式 Fig. 3](https://faculty.ustc.edu.cn/_resources/group1/M00/00/7D/wKhJFWj7g4KAb0luABPgZZBxqqQ382.pdf#page=5)
- 相位公式中的设计焦距 `f` 未见单独数值。按理想空气几何，仅以 1 mm 半径和设计 NA 0.46 反算得约 1.93 mm，和 780 nm 芯片表面参考的 2.6 mm 不同，设计定义与参考面转换尚未对齐。录入 780 nm 参考明确的作者观察值，保留设计焦距空栏。[正式相位式与实验描述](https://faculty.ustc.edu.cn/_resources/group1/M00/00/7D/wKhJFWj7g4KAb0luABPgZZBxqqQ382.pdf#page=3)

## 焦斑与效率

- Fig. 2d 两组径向 `Y (μm)` 横轴范围均为 −4 至 +4，纵轴为 0–1 归一化强度，分别画实测点与模拟曲线。p.4 作者报告一组束腰 `w₀ = 1.33 μm` 和 Rayleigh 长度 `Zᵣ = 11.68 μm`。保留原术语和作者的横向 NA 比较，逐色 FWHM、Strehl、接收采样及采集面尚未明确。作者指出旁瓣及实际高斯入射与设计平顶入射的差异会影响轴向聚焦，讨论的具体因果仍是其解释。[正式 Fig. 2 图注预览](https://www.researchgate.net/figure/Design-fabrication-and-characterization-of-the-multifunctional-metalens-a-Photograph_fig2_387400549) · [正式焦斑表征](https://faculty.ustc.edu.cn/_resources/group1/M00/00/7D/wKhJFWj7g4KAb0luABPgZZBxqqQ382.pdf#page=4)
- p.3 把两路的有效聚焦效率共同写作约 **22%**，用 **5 μm** 光阑过滤焦束。光阑半径或直径、分母定义、背景扣除与独立逐色功率未给。约值显示于协议和逐色说明，独立逐色数值留空。Fig. 2c 的纳米砖转换效率来自模拟。p.4 和 pp.6–7 另讨论光镊中心峰的光束集中因子，仍沿用其独立统计定义。[正式焦点效率段](https://faculty.ustc.edu.cn/_resources/group1/M00/00/7D/wKhJFWj7g4KAb0luABPgZZBxqqQ382.pdf#page=3)

## 公开材料

独立无头 Chrome 获取 arXiv v1 PDF，1256868 字节，SHA-256 `852d3ed3b0d30c1c6fc02fcc23ab9bdaea7c2ac6f90afd408baa6463295b6aaa`。arXiv 源包 1433602 字节，SHA-256 `626354b8f25c5bf1ba6ea4d9537d99620ec203fc6d49adc3d924379b607f229b`。清单列 `fig1.pdf` 至 `fig5.pdf`、`metalens.tex`、参考文献和模板，未见独立二维 PSF 或 MTF 数表。Wiley 的数据声明指向合理请求。Wiley 的正式全文直连、`lpor202401595-sup-0001-SuppMat.pdf` 的两条下载路径，以及 ResearchGate 直接图像在本机返回 HTTP 403。DataCite DOI 精确关联为 0 项，Zenodo API 此次返回 HTTP 500。[arXiv 源包](https://arxiv.org/src/2411.05501v1) · [数据声明与补件目录](https://onlinelibrary.wiley.com/doi/10.1002/lpor.202401595) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1002%2Flpor.202401595%22)

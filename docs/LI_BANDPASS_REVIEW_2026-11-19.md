# Li 2021 带通滤片集成 RGB 消色差超透镜

Hanmeng Li 等，*Photonics Research* 9(7), 1384–1390，2021-07-01。2026-11-19 检索有实物轴扫的经典可见光设计，按 DOI 和题名对照现有数据库。入选依据为同一多波长超透镜版图的带通滤片实验对照，Crossref 同日记录 55 次被引、OpenAlex 54 次。[正式正文](https://dsl.nju.edu.cn/litao/papers/Li_HM-prj-9-7-1384%282021%29.pdf) · [Crossref](https://api.crossref.org/works/10.1364/PRJ.422280) · [OpenAlex](https://openalex.org/W3159657849)

## 滤片与轴向扫描

300 μm 实物的 NA 为 0.2，设计焦距 735 μm。由圆孔半径和设计焦距计算的空气几何 NA 约 0.200，与原文一致。两只样品用同一超透镜版图，Fig. 4d/f 的器件在熔融石英上集成 SiNₓ／SiO₂ 多层三通带滤片，Fig. 4e/g 的对照制在裸熔融石英。完整器件的实测透射峰中心与谱宽为 490 nm／12 nm、543 nm／10 nm、612 nm／15 nm，峰值透过率按同一顺序为 51%、59%、71%。外加 10 nm 滤片的 490、540、610 nm 中心用于焦斑及标靶测量，分别保留。白光实验的滤片选择三段光谱。§3 中优化的 15 个 490–610 nm 谱点仅用于准连续带模型比较。[主文 §§3–5、Figs. 1–3](https://dsl.nju.edu.cn/litao/papers/Li_HM-prj-9-7-1384%282021%29.pdf#page=3)

Fig. 3b 下排为 490、540、610 nm 三次轴向实测，z 轴标 700–800 μm。白虚线按图注对应设计面 735 μm，上排横向焦斑也在该面。测量经线偏振器、100× NA 0.7 的无色差物镜和 CCD，物镜与 CCD 随电动位移台沿 z 轴扫描。作者未印各谱点最佳焦位、步长或焦位误差。轴向图支持三个离散通道在共同设计面附近聚焦，残余焦移和不同场点的横向色差无可录数值。[主文 §5、Fig. 3b](https://dsl.nju.edu.cn/litao/papers/Li_HM-prj-9-7-1384%282021%29.pdf#page=5)

## 焦斑、效率与标靶

| 外加滤片中心 (nm) | x 向 FWHM (μm) | 作者 Strehl | 作者聚焦效率 |
| ---: | ---: | ---: | ---: |
| 490 | 1.42 | 0.78 | 47% |
| 540 | 1.60 | 0.91 | 48% |
| 610 | 1.81 | 0.89 | 50% |

宽度见 p1387 §5 末段，Fig. 3c 的横轴是 x 向。Strehl 为作者由实测计算，参考积分范围和公式未印。§3 对模型效率的定义是焦斑中心直径 3×FWHM 的区域积分强度除以透过超透镜的强度。§5 未说明实验中的实现与透过滤片的损耗归属，数值保留为作者报告的聚焦效率。Fig. 4a–c 用卤素灯和三个 10 nm 滤片，在 2f 物距下显示 USAF 1951 Group 8 Element 1，作者报线宽 1.95 μm。Fig. 4d 去外加滤片后作者报分辨率约 2 μm。Fig. 4f/g 是超连续谱光源的白光轴扫，另有裸石英样品作对照。[主文 §§3、5、Figs. 3–4](https://dsl.nju.edu.cn/litao/papers/Li_HM-prj-9-7-1384%282021%29.pdf#page=5)

## 原始材料

南京大学两个作者组入口的 PDF 经独立无头 Google Chrome 取得，均为 7 页、1183919 字节、SHA256 `d01d9890aacdf4e802d29f2bf01164cf81694a6bfceecd939511d3b24c3431cc`。逐页读取正式版并视觉复核 Figs. 3–4。正文未列数据声明、补件索引或逐频 MTF。Crossref 未报告关联材料，OpenAlex 只列 DOI 地址，DataCite 的精确关联检索为零。二维 PSF、采样和图像 MTF 条件仍待补。数据库新增 8 条、2 个配置。[作者组另一 PDF 入口](https://taoli.nju.edu.cn/_upload/article/files/66/1d/fc4861b646c9bb7af6cd40368743/df43f5f4-b3a2-4860-b2db-b4c542b0003e.pdf) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1364%2FPRJ.422280%22&page%5Bsize%5D=25)

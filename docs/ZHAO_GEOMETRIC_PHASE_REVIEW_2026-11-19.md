# Zhao 2015 金膜孔阵列的离散多谱点聚焦

Zeyu Zhao 等，*Scientific Reports* 5, 15781，2015-10-27 正式上线。DOI 10.1038/srep15781。沿同类可见光双谱点实制器件及几何相位综述追溯，按题名和 DOI 查重。2026-11-19 查 Crossref 114 次、OpenAlex API 122 次。纳入依据为三个谱点的定标轴向图、固定面剖面，以及另一只实物的偏振与焦斑形状对照。[正式版](https://pmc-oa-opendata.s3.amazonaws.com/PMC4621515.1/PMC4621515.1.pdf) · [Crossref](https://api.crossref.org/works/10.1038/srep15781) · [OpenAlex API](https://api.openalex.org/works/W1873395016)

## 三谱点实物

论文 pp5–6 给出圆形区域半径 10 μm 和设计焦距 9 μm。按空气中圆孔轴上几何，计算得到直径 20 μm，NA=R/√(R²+f²)≈0.743。NA 为本库依据原文几何计算。Fig. 4b–d 左右分别为模拟和实测，波长 532、632.8、785 nm，白虚线为 9 μm。Fig. 5 在同一面比较 x 向归一化强度和 FWHM。作者指出，有限孔径使预设焦斑处的强度可能偏离轴向最大值。逐波长最佳焦位、轴向焦移、FWHM 和 Strehl 均无原始数表。785 nm 超出项目可见光筛选上界，完整视图仍显示。[主文 pp5–6](https://pmc-oa-opendata.s3.amazonaws.com/PMC4621515.1/PMC4621515.1.pdf#page=5) · [Fig. 4 原图](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fsrep15781/MediaObjects/41598_2015_Article_BFsrep15781_Fig4_HTML.jpg)

p8 Methods 报正入射，100× 物镜与筒镜及 1600×1200 像元相机。用四分之一波片与偏振器取交叉分量。金膜顶面定义为 z=0，轴扫步进 0.5 μm。原文通过各帧中心线堆叠 x–z 图。相机物方像素标尺未报告，名义倍率不足以据此复算 MTF。[主文 p8](https://pmc-oa-opendata.s3.amazonaws.com/PMC4621515.1/PMC4621515.1.pdf#page=8)

## STED 实物

另制器件的圆形区域半径 10 μm、设计焦距 10 μm，几何 NA≈0.707。Methods 报石英基底、3 nm Ge 粘附层与 120 nm 金膜。Fig. 3a 对应的椭圆孔长短轴为 180／90 nm，六角晶格中心间隔 250 nm。

左圆偏振的 405 nm 在 10 μm 截面展示实心斑，532 nm 的圆偏振测量在同一截面展示环斑，Fig. 3c 未注明入射旋向。Fig. 3c 的坐标与图注支持 x–y 截面，正文写 x–z。532 nm 线偏振的 ±10 μm 双环来自 Fig. 3e，正文指向 Fig. 3d。Fig. 3d 实际为两色 y=0 的剖面。该实验核验焦斑形状，STED 系统成像分辨率待证。Fig. 2 的 405 nm、14 μm 附加环斑为矢量衍射模拟。[主文 pp3–5](https://pmc-oa-opendata.s3.amazonaws.com/PMC4621515.1/PMC4621515.1.pdf#page=3) · [Fig. 3 原图](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fsrep15781/MediaObjects/41598_2015_Article_BFsrep15781_Fig3_HTML.jpg)

## 模拟和功率口径

Fig. 6 的 200 μm 放大模型采用 90 μm 设计焦距。半径、焦距同时乘十，空气几何 NA 不变。p7 正文报告三色的轴向最大强度均出现在预设位置，数据库保存作者报告的模拟峰位。Fig. 6 右列实标 d–f，图注只写 d–e。正文将三色模型峰强均描述为入射波的 50000 倍以上。若右列统一使用顶部 ×10⁴ 倍率，785 nm 的 f 图低于该界限，保留这一图文差异。理想单色 632.8 nm 光学比较给 2.2×10⁵ 峰强倍数及衍射效率超过 25% 的推论。正文未定义该推论的焦圈、功率分母或实测条件，实物效率字段留空。[主文 p7](https://pmc-oa-opendata.s3.amazonaws.com/PMC4621515.1/PMC4621515.1.pdf#page=7)

## 原始材料边界

独立无头 Chrome 取得 PMC 开放档正式版和材料清单。PDF 为 9 页、1109578 字节，MD5 `c1dad26d1bd0d3ebf97dd0acd0742970` 与清单一致，SHA256 `73aab8da3fd316d4da6685caafe9eb43098af40bc15a3d50dcec66db7944bed1`。视觉复核 Figs. 2–6，并用 Springer 的 Fig. 3／4 原图复核标注。PDF 内嵌文件为出版 XMP 元数据。PMC 清单为正式版、文字、6 张论文图与 5 张公式图。DataCite 的精确 DOI 关联检索为零，本次未核到可重建的原始 PSF、标定、逐色数表或 MTF。新增 18 条、6 个配置，其中两只是实物。[PMC 材料清单](https://pmc-oa-opendata.s3.amazonaws.com/PMC4621515.1/PMC4621515.1.json) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1038%2Fsrep15781%22)

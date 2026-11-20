# Zang 与 Xia 的可见光激发与荧光收集消色差

Han-Xiang Zang、Rui-Xing Xia 等，*A Miniaturized Metalens-Based Spin Defect Quantum Sensor*，2026-03-01 正式上线于 *Advanced Functional Materials*，36(39)，e30596。沿 Chen 单原子光镊作者黄坤的机构发表目录定位。2025 年 3 月中科院期刊分区表升级版为材料科学大类一区。正文 p.2 与 Fig. 2a 明确给出两种波长分区共焦设计，§2.2 报告实物测量和单镜成像。[期刊](https://doi.org/10.1002/adfm.202530596) · [2025 年分区](https://www.fabiao.com.cn/sci/1616301x/49.html) · [作者目录](https://faculty.ustc.edu.cn/huangkun/zh_CN/zdylm/739938/list/index.htm)

## 两只镜片的分区和焦位

正式 PDF p.2 §2.1 给出口径 1 mm，内圆直径 474 μm 和设计 NA 0.7，外环径向 NA 0.7–0.9。两款均采用石英基底上的方截面 SiN 纳米柱。柱高 600 nm，节距 250 nm。Metalens-1 内圆用于 532 nm 激发，外环用于约 700 nm 荧光收集，Metalens-2 交换内外区。Fig. 2a 画出两通道的共同设计焦点。Metalens-1 有 Fig. 2d,e 实物照片，两款均在 Fig. 3 报告收集光谱。[设计和照片](https://faculty.ustc.edu.cn/_resources/group1/M00/00/84/wKhJFWmlUBmAI0_pAFzP9cIrg9o138.pdf#page=3)

作者在 p.3 §2.2 将 700 nm 的设计焦位 242 μm 设为 Δz=0。用内圆半径 237 μm 与整镜半径 500 μm 代入空气中 `NA = r / sqrt(r² + f²)`，分别约为 0.70 与 0.90，与原文分区一致。Fig. 3c,d 在 650–850 nm 横轴画出固定激发物镜与 NV 后移动超透镜得到的荧光谱。色标为离焦位置，标示 +40、0、−40 μm。镜片靠近 NV 时收集谱峰红移，远离时蓝移。逐波长实测焦位、532 与 700 nm 的残余轴向差及横向色差仍缺。[原文 §2.2 与 Fig. 3](https://faculty.ustc.edu.cn/_resources/group1/M00/00/84/wKhJFWmlUBmAI0_pAFzP9cIrg9o138.pdf#page=4)

## 相对收集量和系统 PSF

| 器件 | 荧光收集区 | 作者报告的收集谱宽 | 相对物镜收集量 |
| --- | --- | ---: | ---: |
| Metalens-1 | 外环 | 约 30 nm | 约 16% |
| Metalens-2 | 内圆 | 约 50 nm | 34% |

§2.2 使用 Leica HC PL FLUOTAR L 63×/0.70 CORR 商用物镜激发，并以商用物镜收集的荧光为参照。主文未给谱宽判据、谱积分起止点或绝对发光功率。图中相对收集量按参考物镜归一单列。实验测试配置和归一化仍待补件 Note 3。作者用 Note 4 指向离焦与谱峰关系的推导，用 Note 8 指向激发区域与高斯输入匹配的比较。[§2.2 收集实验](https://faculty.ustc.edu.cn/_resources/group1/M00/00/84/wKhJFWmlUBmAI0_pAFzP9cIrg9o138.pdf#page=3)

Fig. 4 使用 Metalens-1 同时激发和收集，以三轴台扫描由 100 nm 掩模孔植入的点状 NV 系综。方法列 532 nm 激发和 650 nm 长通滤光。宽谱发光图用作系统 PSF，Fig. 4c 的 X 截线 FWHM 为 405 nm，Fig. 4d 的 Z 截线为 1.8 μm，均来自实测点高斯拟合。Fig. 4e,f 图内标为模拟，图注末尾重复写 c,d，正文确认 e,f。系统表格未绑定单一探测波长。采样标定、原始荧光阵列、逐色 PSF、MTF 和 Strehl 未获。[实测与模拟 Fig. 4](https://faculty.ustc.edu.cn/_resources/group1/M00/00/84/wKhJFWmlUBmAI0_pAFzP9cIrg9o138.pdf#page=5) · [§4.3 光路](https://faculty.ustc.edu.cn/_resources/group1/M00/00/84/wKhJFWmlUBmAI0_pAFzP9cIrg9o138.pdf#page=8)

## 原始材料状态

独立无头 Chrome 从中科大公开作者库按 HTTP 206 字节区间取回完整正式 PDF `wKhJFWmlUBmAI0_pAFzP9cIrg9o138.pdf`，6082549 字节，SHA-256 `9da4956f254b68e9ca1d975aa6fb333180b7d0fe974846f8c24c462a50aae5d5`。Wiley 数据声明指向合理请求。补件 `adfm74564-sup-0001-SuppMat.pdf` 两条直连路径返回 403。DataCite 的精确 DOI 关联为 0 项，OpenAlex 仅列期刊入口。[正式 PDF](https://faculty.ustc.edu.cn/_resources/group1/M00/00/84/wKhJFWmlUBmAI0_pAFzP9cIrg9o138.pdf) · [数据声明及补件目录](https://doi.org/10.1002/adfm.202530596) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1002%2Fadfm.202530596%22)

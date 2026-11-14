# Lin 2019 GaN消色差阵列接续检查点

历史检查点：001j本批已随PR #94发布验收，当前结果与剩余缺口见[实际核查](LIN_ARRAY_REVIEW_2026-11-14.md)和任务清单。

QUALITY-001j；2026-11-14。Richards2023实际发布验收后继续。尚未录入本篇新数值，不能把本检查点当数据库交付或全文精读。

## 入选与去重

[Lin, Su, Wang, Chen等，Achromatic metalens array for full-colour light-field imaging](https://www.nature.com/articles/s41565-018-0347-0)，Nature Nanotechnology 14, 227–231 (2019)，DOI **10.1038/s41565-018-0347-0**。沿Richards2023主文**参考文献47**定位（不是26；26是Wu等另一阵列论文）。以DOI/题名查当前data目录无匹配，拟作为一研究加入，主文/SI共用编号。

入选理由：经典可见光GaN实制阵列；实际焦距、PSF/效率及MTF在补充材料中有测量/曲线入口，可同时审计裸镜与光场系统的归属。未用引用数或期刊影响因子。

## 已取得与有限读取

- 正式页面无头Chrome HTTP200；作者Tao Li的大学主页存档主文PDF HTTP200，6页（含Methods）；正式SI HTTP200，15页。主文文字已定位作者/DOI、Fig.1设计几何和Data availability，视觉核PDF p.3 Fig.2/3；SI视觉核PDF p.8 S3、p.9 S4。
- 主文Fig.1图注文字给60×60阵列、单镜d21.65μm、设计f49μm、NA0.2157；这些仍待Fig.1图像/正文与SI逐项复核后录入，不将49μm设计值当每色实测。
- S3 p.8有400–660nm、20nm间隔的14个轴向谱点及实测焦距/效率/FWHM曲线。轴向扫描步长1μm；白虚线49μm是参考，不是14条精确焦距原表。曲线均不估读数值。
- S3把operation efficiency定义为输出圆偏振功率/相反手性入射功率；需要继续核主文Methods、实际积分范围和检出通道，不能直接当统一聚焦效率。误差棒称均值/SD，不补未给n。
- **S4 p.9 MTF曲线**：400/540/660nm，与各波长理论衍射极限比较；横轴`frequency (linepair/mm)`，纵轴MTF无量纲；图注明PSF Fourier transform。没有标S/T、场点或完整归一化/裁剪/背景处理，也未取得原始PSF和物方横向采样。1μm轴向步长不能代替横向像素尺度；不从曲线读MTF50或填作者原始数值。
- 主文p.3 Fig.2/3是光场计算渲染/深度重建，不能当裸镜MTF、直接焦斑分辨率或光学SNR。需要将光学阵列/单镜和计算系统配置分开。
- Data availability称绘图数据及其他发现可向通讯作者合理请求。正式附件目录只有SI/影片，未列Source Data；作者关联仓库的定向核查尚待执行，不声称公开数据不存在。

## 下一批动作

核主文Fig.1及Methods、SI结构表/PSF/MTF原始数据入口；绑定单镜/阵列/系统配置与实际测量波长，记录每色焦距/MTF曲线坐标和取数条件。若只有曲线，数值留空，完整记录获取说明与采样/归一化缺口。录入后完成测试、PR、Pages和独立无头Chrome验收；长期目标保持开启。

| 已取得文件 | SHA256 |
| --- | --- |
| [作者存档主文PDF](https://dsl.nju.edu.cn/litao/papers/Lin_RJ-nnano-14-227%282019%29.pdf)，6页 | `50aa2038b3ff8a4c17753be9bc1adce9d2c62c71fcd5d0abc6eadff3c1a1c62d` |
| [`41565_2018_347_MOESM1_ESM.pdf`](https://static-content.springer.com/esm/art%3A10.1038%2Fs41565-018-0347-0/MediaObjects/41565_2018_347_MOESM1_ESM.pdf)，15页 | `bf793f3b15f589675dcb288fea488f5d75de54acf3ad7d64f44967904e798094` |

PDF/图像只留本机`/tmp/lens-mtf-audit/lin2019-main.pdf`、`lin2019-si.pdf`及对应layout文本、SI8/9图像，不提交公开仓库。文字提取报字体权重警告，关键数字需视觉核，不以文本成功提取代替图像复核。

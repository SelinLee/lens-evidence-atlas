> 此为本批开始时的历史检查点。后续实际核验、入库和原始数据候选结论见[正式核验](FROCH_REVIEW_2026-11-14.md)；发布状态以待办/日志为准。

# Fröch2025厘米级可见光计算超透镜：下一批检查点

QUALITY-001l；2026-11-14。本篇尚未录入数据库。长期目标正文与active状态保持，具体论文由本文件/待办/日志承载。

[Johannes E. Fröch et al., Beating spectral bandwidth limits for large aperture broadband nano-optics](https://www.nature.com/articles/s41467-025-58208-4)，Nat. Commun. **16, 3025 (2025)**，DOI **10.1038/s41467-025-58208-4**，正式页2025-03-28上线。沿Zhang2025参考8扩展，当前data/devices与题录未匹配该DOI；下轮仍以最新数据去重。纳入理由是近期实制厘米级可见光PSF/系统线对对比度与计算成像结果，可与物理消色差器件分路线比较；未以引用量或影响因子筛选，不把计算校正的结果当裸镜消色差纪录。

## 实际取得与读取范围

正式网页、Princeton作者项目页均由独立无头Chrome取得HTTP200；主文10页、SI24页正式PDF取得HTTP200并核哈希。当前只读摘要、主文p.4 Fig.2和p.8 Measurements/Data/Code、SI p.17 Note6，以上三页已视觉核；其他SI只作文本定位，尚未完整核器件参数、所有对照设计及z扫描。

| 文件 | SHA256 |
| --- | --- |
| [s41467-025-58208-4.pdf](https://www.nature.com/articles/s41467-025-58208-4.pdf)，10页 | `e745b647640b65ff3c5b70e235b51016e93cfd6c2fc4b5f567d46b504e193e7b` |
| [41467_2025_58208_MOESM1_ESM.pdf](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-025-58208-4/MediaObjects/41467_2025_58208_MOESM1_ESM.pdf)，24页 | `080659a4e98e63f6a1bb989cc47fadf5fa0f78b0684fa21388ccbf7197d057da` |

本机文件`/tmp/lens-mtf-audit/froch2025-*`不提交公开库。

## 已明确的测量边界

1. 摘要的1cm/f2/30°以及100lp/mm处系统对比度仍需对照主文器件设计/系统/处理条件，不能直接录成裸镜MTF或全波段逐波长焦距。本文明确使用计算后端，需将实物结构、测量光路与重建输出分开；hyperboloid/EDOF/polychromatic/end-to-end设计与折射对照也须逐项核归属。
2. 主文p.4 Fig.2b/c为不同入射角0/5/10/15°实测PSF，图标签波长480/530/550/570/650/680nm；比例尺0/5°为40μm、10/15°为200μm。主文p.8 Methods说明PSF直接采于Allied Vision ProSilica GT1930、像素约5.6μm，固定镜片至传感器距离。需核物像面/共轭及文件原始采样，不能只凭图缩放复算。
3. Fig.2g/h/i作者称MTF contrast，实际由USAF1951线对图像得到；SI p.17 Note6 **lines381–391**明确横/纵线对各自求均值截面，再以(max−min)/(max+min)求对比度，最后将横/纵结果平均为Fig.2曲线。不是分别公开的sagittal/tangential，也不是直接从原始PSF数值FFT而来。前后反卷积（dashed/full lines）必须分开，不能把计算后曲线标裸镜MTF。
4. 同段给相机白平衡设0、无AWB、无gain、无sharpening；主文p.8 MTF光路有多模光纤/漫射片/10×NA0.28物镜/USAF/待测镜/TTL180-A镜头/约5.6μm像素相机。横纵线对的场位置、频率与物像方换算、处理前后误差及单色采样需继续核。
5. SI Note5讨论PSF Fourier模值意义，与Note6实测系统线对协议不同；下一轮需视觉核相关页，不能把解释段直接当公开PSF/MTF数表。

## 原始数据入口与下一步

主文p.8 Data/Code均为向作者请求；正式附件列SI、影片及透明审稿文件，未列Source Data。[Princeton项目页](https://light.princeton.edu/publication/1cm-metalens/)HTTP200，未发现本篇专属公开数组链接；页中通用[Datasets入口](https://light.princeton.edu/datasets/)也已取得HTTP200，当前仅列Long-Range Trucking项目，未匹配本篇；只限这个可见列表，不等于作者所有数据均未公开。GitHub/DataCite/其他作者关联库尚未查完，不宣称不存在公开数据。

下一步核设计几何/焦距与4类meta-optic对照、SI PSF/效率/Note5/6和场点，继续查原始数组及数值表。曲线有图无表则保留轴/图号/处理性质，不读图填作者数据；本库复算必须单列输入文件、采样与算法。入库后完成校验/PR/Pages/独立Chrome验收，本批完成不关闭父目标。

# Avayu2017：回到可见光三层RGB器件的检查点

QUALITY-001r；2026-11-15。接续2015近红外实测经典链，回到可见光原作。具体篇名只入待办/日志，持续目标保持长期维护表述。

[Ori Avayu et al., Composite functional metasurfaces for multispectral achromatic optics](https://www.nature.com/articles/ncomms14992)，Nature Communications **8,14992(2017)**，DOI **10.1038/ncomms14992**。正式原文参考文献列出Khorasaninejad2015（Nano Lett.15,5358–5362），本轮已实际核正文题录，作为后续引用扩展；不使用引用量/IF。最新库及只读08_references按DOI/题名无器件记录匹配，录入前再去重。

## 已取得与实际读取范围

独立无头Chrome正式网页/主文PDF/SI PDF均200；主文7页、SI10页，均核PDF魔数/元信息。文件仅`/tmp/lens-mtf-audit/avayu2017-*`，不提交全文。

| 材料 | SHA256 |
| --- | --- |
| [主文](https://www.nature.com/articles/ncomms14992.pdf) | `2b4c62078cda909e8fb52def309de3caace35bb547e265d5d53d3d2ff7e649c8` |
| [SI](https://static-content.springer.com/esm/art%3A10.1038%2Fncomms14992/MediaObjects/41467_2017_BFncomms14992_MOESM3270_ESM.pdf) | `9d30b6bccf5f83f50d937684f36cf08725080c2c0b9271fa671e0d5cfa4aa0d2` |

当前限定读摘要、三层器件设计、Fig2/3图注、Methods/Data availability；SI仅关键词/图注/方法定位。**尚未视觉核图或全文精读**，没有录入本篇新器件/数值。

## 已定位的核查重点

- Au/Ag/Al三层各设计650/550/450nm，器件以二值Fresnel zone plate形式聚焦；工作为离散RGB/窄带通道，不能自动写成完整连续可见光消色差。
- Fig3i含校正/普通FZP实测焦位，SI S3指偏离设计λ后的残余色散；需查原始逐λ数字及参考面，不从图估读。STED/涡旋和异常色散配置分开，不能继承RGB器件性能。
- 正文给出三色宽度数字与20点焦深采样说明，后续须视觉核μm/mm与方向/拟合、不同焦面。PDF文本提取已有μm误成mm的风险，不据错序文本录单位。
- SI S5效率增强/pFZP为模拟设计，不能填实验聚焦效率；SI方法另有功率效率定义，须与实物样本和积分范围核对。
- 正式Data availability说明由作者按合理请求提供相关数据；附件/Source Data/关联仓库和原始PSF/MTF入口仍待查，未联系作者。

下一步视觉核关键图/公式，明确口径/NA/设计f、逐λ实测焦位/FWHM/效率口径及普通FZP对照，再按一篇一编号录入；未核数值留空，复算独立标记。

## 后续状态

以上为开始研究时的历史快照。后续已视觉核主文/SI关键图、完成17行7配置候选录入，实际边界、冲突与发布状态见[核验记录](AVAYU_2017_REVIEW_2026-11-15.md)及任务清单；不要按此快照重做或当作当前未读取状态。

# 维护方法

开始前阅读 [Dot 维护任务说明](docs/DOT_MAINTENANCE.md)，在 [证据补齐任务清单](docs/EVIDENCE_BACKLOG.md) 认领或新建稳定任务 ID，并检查已有分支/PR，避免重复工作或混入他人修改。任务状态只在清单维护；每批实际检索、证据边界和下一步追加到 [研究日志](docs/RESEARCH_LOG.md)。

1. 在 `data/sources/` 创建来源条目：使用稳定 id、原始 URL、DOI（有则填）、章节/图表/公式/页码、读取版本和范围、核验日期。
   对本轮核验的记录使用 `record_status=checked_excerpt`，每个参数填写 `evidence.source_id` 与 `evidence.location`；只复核少数字段时保留其余旧核验边界，不批量刷新日期。
2. 在 `data/metrics/` 写定义、单位、优化方向及不可省略的比较条件，`definition_refs` 必须指向来源。
3. 更新应用的指标导航；它是候选检索集合。`priorities` 只有证据足够时才填，并说明任务。
4. `basis=editorial_synthesis` 表示有出处的编辑性判断。若采用 `author_explicit`，必须补 `explicit_rank_location`，可以在原文找到顺序，不能只给泛泛引用。
5. 产品/论文结果放 `data/benchmarks/`；明确实验、模拟或厂商声明，保留效率分母、积分圈、光谱、焦面、NA、孔径和缺失项。
6. 最佳声明放 `data/scoped_bests.json`：允许 `author_reported_best`、`theoretical_bound`、`corpus_best`。本库最优还需至少两个不同且已存在的同应用候选及比较协议；`comparison_keys`必须覆盖声明的全部共同`conditions`，各候选的`comparison_conditions`必须完整且严格一致。未知、空值及空对象不得比较。结构通过并不证明候选集合完整或数值最优，仍需人工核验。
7. 科学数据变更时修改 `data/catalog.json` 版本、日期；在 CHANGELOG.md 记录具体结论变化和来源。仅维护文档/任务清单时不刷新科学数据版本或来源核验日期。
8. 运行 `npm test && npm run build`，检查 `dist` 差异，连同源数据提交 PR。
9. 审核通过后合并；按 README 发布到既有私有 Sites。源数据更新不会自行把站点开放给所有人。

PR 写明任务 ID、已满足的验收项和剩余缺口；提交审核记为 `review`，通过验收并合并后记为 `done`，另记网页实际部署状态。任务部分完成时拆分或保留未完成验收项，不能用“已搜索”代替“已补证”。仅文档变更不要求重新部署网站。

## 阅读核验

每个重要数字至少绑定一个能直接支撑它的原文位置。仅有摘要/搜索索引时就标明该范围。引用文章讨论的指标，不意味着文章给出了它的重要性名次。

原始研究优先于百科；综述用于寻找候选文献，纪录尽量回原始研究。标准条款判断以适用正式标准为准，优先级不是机械的“论文胜过标准”。

## 链接检查

`npm run check:links` 是可选的只读网络检查；403、429、验证码与网络失败只说明暂时不可访问，不说明科学结论错误。检查不会修改内容或自动提升核验等级。

本库最优的 `comparison_keys` 还必须包含指标的全部 `required_conditions`，填写 `as_of`、`checked_on`、`selected_record_id`、`comparison_parameter_name`。每个候选对应参数需有匹配 `metric_id` 与定位来源；展示值必须等于选中记录参数值。上述检查不自动证明候选数值的科学可比性或最大/最小关系。

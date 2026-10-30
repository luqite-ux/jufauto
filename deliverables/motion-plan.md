# 九峰自动化动效方案

## 结论

选择 4 个场景，组合定位为“工业控制界面 + 装配节拍”，区别于近期项目的暖通气流、纱线路径、纸材加工和配电柜列。全部内容基础状态默认可见；动效脚本失败只损失动画，不损失正文。

1. `JF-M01` 三张客户 Banner 400–500ms 交叉淡化，标题、说明与 CTA 独立错峰进入；支持手动切换、暂停，390px 使用逐图焦点。减少动效时停止自动轮播并直接显示当前图。
2. `JF-M02` 产品族、能力、实拍和产品卡在真实进入视口后 20px/12px 有界揭示，550ms，错峰累计不超过 240ms。每个区块独立观察；禁止全局超时把屏外区块标记为已播放。
3. `JF-M03` “需求分析 → 方案设计 → 装配集成 → 调试验证 → 交付支持”使用短时控制信号轨道；桌面横向、390px 纵向。仅在节点进入视口时播放一次，不持续闪烁。
4. `JF-M04` 导航、分类筛选、产品卡、图库、FAQ、CTA、验证码刷新和表单控件提供 150–220ms 的边框、颜色、箭头、focus/press 反馈；触屏不依赖 hover 获取信息。

## 外部新鲜候选评分

| 候选 | 来源 | 结论 | 理由 |
|---|---|---|---|
| Motion `inView` / `useInView` | https://motion.dev/docs/inview / https://motion.dev/docs/react-use-in-view | 采用机制 | 基于 IntersectionObserver，适合逐区块真实入场、清理观察器和一次触发 |
| Motion `scroll()` | https://motion.dev/docs/scroll | 局部参考 | 只吸收流程进度叙事，不采用整页滚动绑定或深视差，避免干扰长目录采购 |
| MDN view progress timeline | https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations/Timelines | 渐进增强 | 可用于短流程线；不作为内容可见的必要条件，兼容不足时静态显示 |
| Deep parallax / perpetual equipment motion | 外部常见模式 | 淘汰 | 降低设备识别、移动端性能和可访问性，且不帮助采购决策 |

## 双端与降级门槛

- 桌面：所有公开页面首个和最后一个主要区块必须真实触发；页顶停留超过最长兜底时间后，中后段仍保持待触发。
- 390px：位移降为 12px，流程改纵向，轮播控件不遮挡主体和 CTA，无水平溢出。
- `prefers-reduced-motion`：关闭非必要位移、轨道、自动轮播和错峰；内容、表单与操作反馈立即可用。
- 无 JS、脚本阻断、慢加载、返回导航：内容保持可见；`fallback-visible` 与 `hasAnimated` 分离。

计划状态：桌面 PASS；390px PASS；reduced-motion PASS。最终实现与真实浏览器证据待源码接管后回填。

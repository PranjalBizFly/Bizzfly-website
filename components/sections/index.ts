export { SectionHeader } from "./SectionHeader";
export { NumberedList } from "./NumberedList";
export type { NumberedEntry } from "./NumberedList";
export { ProcessBlock } from "./ProcessBlock";
export { FAQBlock } from "./FAQBlock";
export { QuoteBlock } from "./QuoteBlock";
export { RelatedContent, RelationshipMap } from "./RelatedContent";
export type { RelatedMode } from "./RelatedContent";
export { ContentBlock } from "./ContentBlock";
export { EditorialBlock } from "./EditorialBlock";
/* Retained for the first verified image: enforces explicit dimensions. */
export { MediaBlock } from "./MediaBlock";
export { EmptyState } from "./EmptyState";
export { ConversionBand } from "./ConversionBand";
export { SurfacePresence } from "./SurfacePresence";
export { VisibilitySpectrum } from "./VisibilitySpectrum";
export { LayerTabs } from "./LayerTabs";
export type { LayerTabItem } from "./LayerTabs";
export { CapabilityGroups } from "./CapabilityGroups";
export { ProblemList } from "./ProblemList";
export { StageList } from "./StageList";
export { JourneyList } from "./JourneyList";
export { TrustStandard } from "./TrustStandard";
export { Diagram } from "./Diagram";
export { Directory } from "./Directory";
export type { DirectoryGroup } from "./Directory";
export { VisualStoryBlock } from "./VisualStoryBlock";
export type { VisualStoryBlockProps } from "./VisualStoryBlock";
export { ShowcaseGrid } from "./ShowcaseGrid";
export type { ShowcaseEntry } from "./ShowcaseGrid";
export { StatBand } from "./StatBand";
export type { Stat } from "./StatBand";
export { InsightGrid } from "./InsightGrid";
export type { InsightEntry } from "./InsightGrid";
export { ProseSections } from "./ProseSections";
export { WhyBizzFly } from "./WhyBizzFly";
export { GrowthEngine } from "./GrowthEngine";
export { FounderNote } from "./FounderNote";
export { TestimonialCarousel } from "./TestimonialCarousel";
export { CardTrack } from "./CardTrack";
export type { CardTrackEntry } from "./CardTrack";
export { BeforeAfter } from "./BeforeAfter";
export type { BeforeAfterSide } from "./BeforeAfter";
export { ProblemMap } from "./ProblemMap";
export type { ProblemMapProblem, ProblemMapSolution } from "./ProblemMap";
export { ChoiceList } from "./ChoiceList";
export type { Choice } from "./ChoiceList";
/*
 * The four readings of a paragraph run. Which one a page uses is decided by
 * what its content is, not by rotation — see app/resources/[slug]/page.tsx
 * and lib/prose.ts.
 */
export { ClaimSequence } from "./ClaimSequence";
export { ClaimDimensions } from "./ClaimDimensions";
export { ClaimFacets } from "./ClaimFacets";
export { ClaimCriteria } from "./ClaimCriteria";
/*
 * The Trivana-style composition: a statement, its frame with a floating
 * label, and the enumerated detail beside it rather than after it.
 */
export { AnchoredStatement } from "./AnchoredStatement";
export { PracticeNarrative } from "./PracticeNarrative";
/*
 * The grouped-taxonomy reading. A sticky rail carries the structure and the
 * reader's position in it; the column carries one group at a time.
 */
export { StickyIndex } from "./StickyIndex";
export type { StickyIndexGroup, StickyIndexItem } from "./StickyIndex";

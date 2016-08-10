
declare class BEMAnimationManager extends NSObject {

	static alloc(): BEMAnimationManager; // inherited from NSObject

	static new(): BEMAnimationManager; // inherited from NSObject

	animationDuration: number;

	constructor(); // inherited from NSObject

	constructor(o: { animationDuration: number; });

	fillAnimationWithBouncesAmplitudeReverse(bounces: number, amplitude: number, reverse: boolean): CAKeyframeAnimation;

	morphAnimationFromPathToPath(fromPath: UIBezierPath, toPath: UIBezierPath): CABasicAnimation;

	opacityAnimationReverse(reverse: boolean): CABasicAnimation;

	self(): BEMAnimationManager; // inherited from NSObjectProtocol

	strokeAnimationReverse(reverse: boolean): CABasicAnimation;
}

declare const enum BEMAnimationType {

	Stroke = 0,

	Fill = 1,

	Bounce = 2,

	Flat = 3,

	OneStroke = 4,

	Fade = 5
}

declare const enum BEMBoxType {

	Circle = 0,

	Square = 1
}

declare class BEMCheckBox extends UIView {

	static appearance(): BEMCheckBox; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): BEMCheckBox; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): BEMCheckBox; // inherited from UIAppearance

	//static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): BEMCheckBox; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): BEMCheckBox; // inherited from UIAppearance

	//static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): BEMCheckBox; // inherited from UIAppearance

	animationDuration: number;

	boxType: BEMBoxType;

	delegate: BEMCheckBoxDelegate;

	hideBox: boolean;

	lineWidth: number;

	minimumTouchSize: CGSize;

	offAnimationType: BEMAnimationType;

	on: boolean;

	onAnimationType: BEMAnimationType;

	onCheckColor: UIColor;

	onFillColor: UIColor;

	onTintColor: UIColor;

	constructor(o: { coder: NSCoder; }); // inherited from NSCoding

	constructor(o: { frame: CGRect; }); // inherited from UIView

	reload(): void;

	self(): BEMCheckBox; // inherited from NSObjectProtocol

	setOnAnimated(on: boolean, animated: boolean): void;
}

interface BEMCheckBoxDelegate extends NSObjectProtocol {

	animationDidStopForCheckBox?(checkBox: BEMCheckBox): void;

	didTapCheckBox?(checkBox: BEMCheckBox): void;
}
declare var BEMCheckBoxDelegate: {

	prototype: BEMCheckBoxDelegate;
};

declare var BEMCheckBoxVersionNumber: number;

//declare var BEMCheckBoxVersionString: interop.Reference<number>;

declare class BEMPathManager extends NSObject {

	static alloc(): BEMPathManager; // inherited from NSObject

	static new(): BEMPathManager; // inherited from NSObject

	boxType: BEMBoxType;

	lineWidth: number;

	size: number;

	constructor(); // inherited from NSObject

	pathForBox(): UIBezierPath;

	pathForCheckMark(): UIBezierPath;

	pathForFlatCheckMark(): UIBezierPath;

	pathForLongCheckMark(): UIBezierPath;

	self(): BEMPathManager; // inherited from NSObjectProtocol
}

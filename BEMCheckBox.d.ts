/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />

declare class BEMAnimationManager extends NSObject {

    static alloc(): BEMAnimationManager; // inherited from NSObject

    static new(): BEMAnimationManager; // inherited from NSObject

    animationDuration: number;

    constructor(o: { animationDuration: number; });

    fillAnimationWithBouncesAmplitudeReverse(bounces: number, amplitude: number, reverse: boolean): CAKeyframeAnimation;

    initWithAnimationDuration(animationDuration: number): this;

    morphAnimationFromPathToPath(fromPath: UIBezierPath, toPath: UIBezierPath): CABasicAnimation;

    opacityAnimationReverse(reverse: boolean): CABasicAnimation;

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

declare class BEMCheckBox extends UIControl implements CAAnimationDelegate {

    static alloc(): BEMCheckBox; // inherited from NSObject

    static appearance(): BEMCheckBox; // inherited from UIAppearance

    static appearanceForTraitCollection(trait: UITraitCollection): BEMCheckBox; // inherited from UIAppearance

    static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): BEMCheckBox; // inherited from UIAppearance

    static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): BEMCheckBox; // inherited from UIAppearance

    static appearanceWhenContainedIn(ContainerClass: typeof NSObject): BEMCheckBox; // inherited from UIAppearance

    static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): BEMCheckBox; // inherited from UIAppearance

    static new(): BEMCheckBox; // inherited from NSObject

    animationDuration: number;

    boxType: BEMBoxType;

    cornerRadius: number;

    delegate: BEMCheckBoxDelegate;

    readonly group: BEMCheckBoxGroup;

    hideBox: boolean;

    lineWidth: number;

    minimumTouchSize: CGSize;

    offAnimationType: BEMAnimationType;

    offFillColor: UIColor;

    on: boolean;

    onAnimationType: BEMAnimationType;

    onCheckColor: UIColor;

    onFillColor: UIColor;

    onTintColor: UIColor;

    readonly debugDescription: string; // inherited from NSObjectProtocol

    readonly description: string; // inherited from NSObjectProtocol

    readonly hash: number; // inherited from NSObjectProtocol

    readonly isProxy: boolean; // inherited from NSObjectProtocol

    readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

    readonly  // inherited from NSObjectProtocol

    animationDidStart(anim: CAAnimation): void;

    animationDidStopFinished(anim: CAAnimation, flag: boolean): void;

    class(): typeof NSObject;

    conformsToProtocol(aProtocol: any /* Protocol */): boolean;

    isEqual(object: any): boolean;

    isKindOfClass(aClass: typeof NSObject): boolean;

    isMemberOfClass(aClass: typeof NSObject): boolean;

    performSelector(aSelector: string): any;

    performSelectorWithObject(aSelector: string, object: any): any;

    performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

    reload(): void;

    respondsToSelector(aSelector: string): boolean;

    retainCount(): number;

    self(): this;

    setOnAnimated(on: boolean, animated: boolean): void;
}

interface BEMCheckBoxDelegate extends NSObjectProtocol {

    animationDidStopForCheckBox?(checkBox: BEMCheckBox): void;

    didTapCheckBox?(checkBox: BEMCheckBox): void;
}
declare var BEMCheckBoxDelegate: {

    prototype: BEMCheckBoxDelegate;
};

declare class BEMCheckBoxGroup extends NSObject {

    static alloc(): BEMCheckBoxGroup; // inherited from NSObject

    static groupWithCheckBoxes(checkBoxes: NSArray<BEMCheckBox>): BEMCheckBoxGroup;

    static new(): BEMCheckBoxGroup; // inherited from NSObject

    readonly checkBoxes: NSHashTable<any>;

    mustHaveSelection: boolean;

    selectedCheckBox: BEMCheckBox;

    addCheckBoxToGroup(checkBox: BEMCheckBox): void;

    removeCheckBoxFromGroup(checkBox: BEMCheckBox): void;
}

declare var BEMCheckBoxVersionNumber: number;

declare var BEMCheckBoxVersionString: interop.Reference<number>;

declare class BEMPathManager extends NSObject {

    static alloc(): BEMPathManager; // inherited from NSObject

    static new(): BEMPathManager; // inherited from NSObject

    boxType: BEMBoxType;

    cornerRadius: number;

    lineWidth: number;

    size: number;

    pathForBox(): UIBezierPath;

    pathForCheckMark(): UIBezierPath;

    pathForFlatCheckMark(): UIBezierPath;

    pathForLongCheckMark(): UIBezierPath;
}

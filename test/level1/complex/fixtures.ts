import { complex as _, fortranArrComplex64 as arr64 } from '../../../src/lib/f_func';

const pI = Infinity;
const nI = -Infinity;
const { PI, sin, cos, abs } = Math;

const cospi = x => cos(PI * x);
const sinpi = x => sin(PI * x);

export const fixture = {
    // CY(IY) = CY(IY) + CA*CX(IX)
    caxpy: {
        case0: {
            desc: 'cy = cy + ca*cx, incx=1, incy=1',
            input: {
                //> set.seed(0)
                //> complex(r=rnorm(10),i=rnorm(10))
                cx: {
                    re: [
                        1.2629542848807933098, -0.3262333607056494000, 1.3297992629225006134,
                        1.2724293214294046805, 0.4146414344564082199, -1.5399500419037095433,
                        -0.9285670347135380753, -0.2947204467905601977, -0.0057671727475369552,
                        2.4046533888579508798
                    ],
                    im:
                        [0.76359346114045956, -0.79900924898936820, -1.14765700923635139,
                            -0.28946157368822334, -0.29921511789731614, -0.41151083279506701,
                            0.25222344815613229, -0.89192112728456863, 0.43568329935571865,
                            -1.23753842192995811]
                },
                //set.seed(123) (Mersenne-Twister, Inversion)
                cy: {
                    re: [-0.560475646552212603, -0.230177489483279957, 1.558708314149124030,
                        0.070508391424576003, 0.129287735160946243, 1.715064986883281017,
                        0.460916205989202299, -1.265061234606533969, -0.686852851893526073,
                    -0.445661970099958060],
                    im: [1.22408179743946155, 0.35981382705736381, 0.40077145059405217,
                        0.11068271594511971, -0.55584113475407493, 1.78691313680307817,
                        0.49785047822923939, -1.96661715662963821, 0.70135590156368555,
                        -0.47279140772793404]
                },
                ca: { re: 23, im: 32 },
                incx: 1,
                incy: 1,
                n: 10
            },
            output: {
                re: [4.052482149211329, 17.834751181946569, 68.869115656929893,
                    38.599153142324027, 19.240924500372454, -20.535439327459894,
                    -28.967275933418406, 20.497844562316779, -14.761363404469874,
                    94.462595475391566],
                im: [59.2012685198554109, -28.4568664422788906, 16.5582366516779906,
                    34.1708048068569283, 5.8307370562127172, -56.9562373584021628,
                    -23.4151553250129361, -31.9118573814726432, 10.5375222588240316,
                    48.0127333313374578]
            }
        },
        case1: {
            desc: 'cy = cy + ca*cx, incx=2, incy=2',
            input: {
                n: 5,
                //> set.seed(0)
                //> complex(r=rnorm(10),i=rnorm(10))
                cx: {
                    re: [
                        1.2629542848807933098, -0.3262333607056494000, 1.3297992629225006134,
                        1.2724293214294046805, 0.4146414344564082199, -1.5399500419037095433,
                        -0.9285670347135380753, -0.2947204467905601977, -0.0057671727475369552,
                        2.4046533888579508798
                    ],
                    im:
                        [0.76359346114045956, -0.79900924898936820, -1.14765700923635139,
                            -0.28946157368822334, -0.29921511789731614, -0.41151083279506701,
                            0.25222344815613229, -0.89192112728456863, 0.43568329935571865,
                            -1.23753842192995811]
                },
                //set.seed(123) (Mersenne-Twister, Inversion)
                cy: {
                    re: [-0.560475646552212603, -0.230177489483279957, 1.558708314149124030,
                        0.070508391424576003, 0.129287735160946243, 1.715064986883281017,
                        0.460916205989202299, -1.265061234606533969, -0.686852851893526073,
                    -0.445661970099958060],
                    im: [1.22408179743946155, 0.35981382705736381, 0.40077145059405217,
                        0.11068271594511971, -0.55584113475407493, 1.78691313680307817,
                        0.49785047822923939, -1.96661715662963821, 0.70135590156368555,
                        -0.47279140772793404]
                },
                ca: { re: 23, im: 32 },
                incx: 2,
                incy: 2
            },
            output: {
                re: [4.052482149211329, -0.230177489483279957, 68.869115656929893,
                    0.070508391424576003, 19.240924500372454, 1.715064986883281017,
                    -28.967275933418406, -1.265061234606533969, -14.761363404469874,
                    -0.445661970099958060],
                im: [59.2012685198554109, 0.35981382705736381, 16.5582366516779906,
                    0.11068271594511971, 5.8307370562127172, 1.78691313680307817,
                    -23.4151553250129361, -1.96661715662963821, 10.5375222588240316,
                    -0.47279140772793404]
            }
        },
        case2: {
            desc: 'cy = cy + ca*cx, ca = 0+i0',
            input: {
                n: 1,
                cy: { re: [1], im: [2] },
                cx: { re: [3], im: [4] },
                ca: { re: 0, im: 0 },
                incx: 1,
                incy: 1,
            },
            output: { re: [1], im: [2] }
        },
        case3: {
            desc: 'cy = cy + ca*cx, n=0',
            input: {
                n: 0,
                cy: { re: [3], im: [4] },
                cx: { re: [9], im: [4] },
                ca: { re: 1, im: 2 },
                incx: 1,
                incy: 1,
            },
            output: { re: [3], im: [4] }
        },
        case4: {
            desc: 'cy = cy + ca*cx, incx=-2, incy=-2',
            input: {
                n: 5,
                //> set.seed(0)
                //> complex(r=rnorm(10),i=rnorm(10))
                cx: {
                    re: [
                        1.2629542848807933098, -0.3262333607056494000, 1.3297992629225006134,
                        1.2724293214294046805, 0.4146414344564082199, -1.5399500419037095433,
                        -0.9285670347135380753, -0.2947204467905601977, -0.0057671727475369552,
                        2.4046533888579508798
                    ],
                    im:
                        [0.76359346114045956, -0.79900924898936820, -1.14765700923635139,
                            -0.28946157368822334, -0.29921511789731614, -0.41151083279506701,
                            0.25222344815613229, -0.89192112728456863, 0.43568329935571865,
                            -1.23753842192995811]
                },
                //set.seed(123) (Mersenne-Twister, Inversion)
                cy: {
                    re: [-0.560475646552212603, -0.230177489483279957, 1.558708314149124030,
                        0.070508391424576003, 0.129287735160946243, 1.715064986883281017,
                        0.460916205989202299, -1.265061234606533969, -0.686852851893526073,
                    -0.445661970099958060],
                    im: [1.22408179743946155, 0.35981382705736381, 0.40077145059405217,
                        0.11068271594511971, -0.55584113475407493, 1.78691313680307817,
                        0.49785047822923939, -1.96661715662963821, 0.70135590156368555,
                        -0.47279140772793404]
                },
                ca: { re: 23, im: 32 },
                incx: -2,
                incy: -2
            },
            output: {
                re: [4.052482149211329, -0.230177489483279957, 68.869115656929893,
                    0.070508391424576003, 19.240924500372454, 1.715064986883281017,
                    -28.967275933418406, -1.265061234606533969, -14.761363404469874,
                    -0.445661970099958060],
                im: [59.2012685198554109, 0.35981382705736381, 16.5582366516779906,
                    0.11068271594511971, 5.8307370562127172, 1.78691313680307817,
                    -23.4151553250129361, -1.96661715662963821, 10.5375222588240316,
                    -0.47279140772793404]
            }
        },
    },
    caxpyErrors: {
        case0: {
            desc: 'caxpy, cx has no imaginary part',
            input: {
                n: 1,
                //> set.seed(0)
                //> complex(r=rnorm(10),i=rnorm(10))
                cx: {
                    re: [1.2629542848807933098]
                },
                //set.seed(123) (Mersenne-Twister, Inversion)
                cy: {
                    re: [-0.560475646552212603],
                    im: [34]
                },
                ca: { re: 23, im: 32 },
                incx: 1,
                incy: 1
            }
        },
        case1: {
            desc: 'caxpy, cy has no imaginary part',
            input: {
                n: 1,
                //> set.seed(0)
                //> complex(r=rnorm(10),i=rnorm(10))
                cx: {
                    re: [1.2629542848807933098],
                    im: [1]
                },
                //set.seed(123) (Mersenne-Twister, Inversion)
                cy: {
                    re: [-0.560475646552212603],
                },
                ca: { re: 23, im: 32 },
                incx: 1,
                incy: 1
            }
        },
    },
    ccopy: {
        case0: {
            desc: 'n=4, cx={4}, cy={4}, incx=1, incy=1',
            input: {
                n: 4,
                cx: {
                    re: [1, 2, 3, 4],
                    im: [5, 6, 7, 8]
                },
                cy: {
                    re: [0, 0, 0, 0],
                    im: [0, 0, 0, 0]
                },
                incx: 1,
                incy: 1,

            },
            output: {
                re: [1, 2, 3, 4],
                im: [5, 6, 7, 8]
            },
        },
        case1: {
            desc: 'n=4, cx={4}, cy={4}, incx=-1, incy=-1',
            input: {
                n: 4,
                cx: {
                    re: [1, 2, 3, 4],
                    im: [5, 6, 7, 8]
                },
                cy: {
                    re: [0, 0, 0, 0],
                    im: [0, 0, 0, 0]
                },
                incx: -1,
                incy: -1,

            },
            output: {
                re: [1, 2, 3, 4],
                im: [5, 6, 7, 8]
            },
        },
        case2: {
            desc: 'n=0, cx={4}, cy={4}',
            input: {
                n: 0,
                cx: {
                    re: [1, 2, 3, 4],
                    im: [5, 6, 7, 8]
                },
                cy: {
                    re: [0, 0, 0, 0],
                    im: [0, 0, 0, 0]
                },
                incx: -1,
                incy: -1,

            },
            output: {
                re: [0, 0, 0, 0],
                im: [0, 0, 0, 0]
            },
        },
    },
    ccopyErrors: {
        case3: {
            desc: 'cx has no imaginary part',
            input: {
                n: 1,
                cx: {
                    re: [1, 2, 3, 4],
                },
                cy: {
                    re: [0, 0, 0, 0],
                    im: [0, 0, 0, 0]
                },
                incx: -1,
                incy: -1,
            }
        },
        case4: {
            desc: 'cy has no imaginary part',
            input: {
                n: 1,
                cx: {
                    re: [1, 2, 3, 4],
                    im: [2, 3, 4, 5]
                },
                cy: {
                    re: [0, 0, 0, 0],
                },
                incx: -1,
                incy: -1,
            }
        },
    },
    cdotc: {
        case0: {
            desc: 'n=4, cx={4}, cy={4}, incx=1, incy=1',
            input: {
                n: 4,
                cx: {
                    re: [1, 2, 3, 4],
                    im: [5, 6, 7, 8]
                },
                cy: {
                    re: [5, 6, 7, 8],
                    im: [9, 10, 11, 12]
                },
                incx: 1,
                incy: 1,

            },
            output: {
                re: 348,
                im: -64
            },
        },
        case1: {
            desc: 'n=4, cx={4}, cy={4}, incx=-1, incy=-1',
            input: {
                n: 4,
                cx: {
                    re: [1, 2, 3, 4],
                    im: [5, 6, 7, 8]
                },
                cy: {
                    re: [5, 6, 7, 8],
                    im: [9, 10, 11, 12]
                },
                incx: -1,
                incy: -1,

            },
            output: {
                re: 348,
                im: -64
            },
        },
        case2: {
            desc: 'n=0, cx={4}, cy={4}, incx=-1, incy=-1',
            input: {
                n: 0,
                cx: {
                    re: [1],
                    im: [5]
                },
                cy: {
                    re: [5],
                    im: [9]
                },
                incx: -1,
                incy: -1,
            },
            output: {
                re: 0,
                im: 0
            },
        }
    },
    cdotcError: {
        case3: {
            desc: 'cx has no imaginary part, should fail',
            input: {
                n: 4,
                cx: {
                    re: [1, 2, 3, 4],
                },
                cy: {
                    re: [5, 6, 7, 8],
                    im: [9, 10, 11, 12]
                },
                incx: 1,
                incy: 1,

            }
        },
        case4: {
            desc: 'cy has no imaginary part, should fail',
            input: {
                n: 4,
                cx: {
                    re: [1, 2, 3, 4],
                    im: [9, 10, 11, 12]
                },
                cy: {
                    re: [5, 6, 7, 8],
                },
                incx: 1,
                incy: 1,
            }
        }
    },
    cdotu: {
        case0: {
            desc: 'cdotu, n=4, cx={4}, cy={4}, incx=1, incy=1',
            input: {
                n: 4,
                cx: {
                    re: [1, 2, 3, 4],
                    im: [5, 6, 7, 8]
                },
                cy: {
                    re: [5, 6, 7, 8],
                    im: [9, 10, 11, 12]
                },
                incx: 1,
                incy: 1,
            },
            output: {
                re: -208,
                im: 284
            }
        },
        case1: {
            desc: 'cdotu, n=4, cx={4}, cy={4}, incx=-1, incy=-1',
            input: {
                n: 4,
                cx: {
                    re: [1, 2, 3, 4],
                    im: [5, 6, 7, 8]
                },
                cy: {
                    re: [5, 6, 7, 8],
                    im: [9, 10, 11, 12]
                },
                incx: -1,
                incy: -1,
            },
            output: {
                re: -208,
                im: 284
            }
        },
        case2: {
            desc: 'cdotu, n=0, cx={4}, cy={4}, incx=1, incy=1',
            input: {
                n: 0,
                cx: {
                    re: [1, 2, 3, 4],
                    im: [5, 6, 7, 8]
                },
                cy: {
                    re: [5, 6, 7, 8],
                    im: [9, 10, 11, 12]
                },
                incx: 1,
                incy: 1,
            },
            output: {
                re: 0,
                im: 0
            }
        }
    },
    cdotuError: {
        case0: {
            desc: 'missing cx imaginary part will throw',
            input: {
                n: 4,
                cx: {
                    re: [1, 2, 3, 4],
                },
                cy: {
                    re: [5, 6, 7, 8],
                    im: [9, 10, 11, 12]
                },
                incx: 1,
                incy: 1,
            }
        },
        case1: {
            desc: 'missing cy imaginary part will throw',
            input: {
                n: 4,
                cx: {
                    re: [1, 2, 3, 4],
                    im: [9, 10, 11, 12]
                },
                cy: {
                    re: [5, 6, 7, 8],
                },
                incx: 1,
                incy: 1,
            }
        }
    },

    crotg: {
        case0: {
            desc: 'crotg givens rotation ca=(11,19), cb=(34,23), c=>0.471621990, s=>(0.793538332,0.384538263)',
            input: {
                ca: { re: 11, im: 19 },
                cb: { re: 34, im: 23 },
            },
            output: {
                ca: { re: 23.323763103564644, im: 40.286499906157111 },
                cb: { re: 34.000000, im: 23.0000000 },
                c: 0.47162200847078728,
                s: { re: 0.79353827566350310, im: 0.38453827661622281 }
            }
        },
        case1: {
            desc: 'cdotu, n=4, ca=0, should return 0',
            input: {
                ca: { re: 0, im: 0 },
                cb: { re: -1, im: -1 }
            },
            output: {
                ca: { re: -1, im: -1 }, //copy of cb
                cb: { re: -1, im: -1 },
                c: 0,
                s: { re: 1, im: 0 }
            }
        }
    },
    cscal: {
        case0: {
            desc: 'cscal n=6, ca={2,4}, cx={6}',
            input: {
                n: 6,
                ca: { re: 2, im: 4 },
                cx: {
                    re: [1.26295428488079331, -0.32623336070564940, 1.32979926292250061,
                        1.27242932142940468, 0.41464143445640822, -1.53995004190370954],
                    im: [-0.9285670347135380753, -0.2947204467905601977, -0.0057671727475369552,
                        2.4046533888579508798, 0.7635934611404595618, -0.7990092489893682037]
                },
                incx: 1
            },
            output: {
                cx: {
                    re: [6.24017670861573848, 0.52641506575094199, 2.68266721683514886,
                        -7.07375491257299416, -2.22509097564902181, 0.11613691215005373],
                    im: [3.1946830700960973, -1.8943743364037180, 5.3076627061949289,
                        9.8990240634335205, 3.1857526601065520, -7.7578186655935744]
                }
            },
        },
        case1: {
            desc: 'cscal n=3, incx=2, ca={2,4}, cx={6}',
            input: {
                n: 3,
                ca: { re: 2, im: 4 },
                cx: {
                    re: [1.26295428488079331, -0.32623336070564940, 1.32979926292250061,
                        1.27242932142940468, 0.41464143445640822, -1.53995004190370954],
                    im: [-0.9285670347135380753, -0.2947204467905601977, -0.0057671727475369552,
                        2.4046533888579508798, 0.7635934611404595618, -0.7990092489893682037]
                },
                incx: 2
            },
            output: {
                cx: {
                    re: [6.24017670861573848, -0.32623336070564940, 2.68266721683514886,
                        1.27242932142940468, -2.22509097564902181, -1.53995004190370954],
                    im: [3.1946830700960973, -0.2947204467905601977, 5.3076627061949289,
                        2.4046533888579508798, 3.1857526601065520, -0.7990092489893682037]
                }
            },
        },
        case2: {
            desc: 'cscal n=0, cx unchanged',
            input: {
                n: 0,
                ca: { re: 2, im: 4 },
                cx: {
                    re: [1.26295428488079331, -0.32623336070564940, 1.32979926292250061,
                        1.27242932142940468, 0.41464143445640822, -1.53995004190370954],
                    im: [-0.9285670347135380753, -0.2947204467905601977, -0.0057671727475369552,
                        2.4046533888579508798, 0.7635934611404595618, -0.7990092489893682037]
                },
                incx: 2
            },
            output: {
                cx: {
                    re: [1.26295428488079331, -0.32623336070564940, 1.32979926292250061,
                        1.27242932142940468, 0.41464143445640822, -1.53995004190370954],
                    im: [-0.9285670347135380753, -0.2947204467905601977, -0.0057671727475369552,
                        2.4046533888579508798, 0.7635934611404595618, -0.7990092489893682037]
                },
            },
        },
        case3: {
            desc: 'cscal incx=0 cx unchanged',
            input: {
                n: 3,
                ca: { re: 2, im: 4 },
                cx: {
                    re: [1.26295428488079331, -0.32623336070564940, 1.32979926292250061,
                        1.27242932142940468, 0.41464143445640822, -1.53995004190370954],
                    im: [-0.9285670347135380753, -0.2947204467905601977, -0.0057671727475369552,
                        2.4046533888579508798, 0.7635934611404595618, -0.7990092489893682037]
                },
                incx: 0
            },
            output: {
                cx: {
                    re: [1.26295428488079331, -0.32623336070564940, 1.32979926292250061,
                        1.27242932142940468, 0.41464143445640822, -1.53995004190370954],
                    im: [-0.9285670347135380753, -0.2947204467905601977, -0.0057671727475369552,
                        2.4046533888579508798, 0.7635934611404595618, -0.7990092489893682037]
                },
            },
        }
    },
    cscalError: {
        case0: {
            desc: 'cscal imaginary part of cx will throw',
            input: {
                n: 6,
                ca: { re: 2, im: 4 },
                cx: {
                    re: [1.26295428488079331]
                },
                incx: 1
            }
        },
    },
    csrot: {
        case0: {
            desc: 'csrot n=2, cx={2}, cy={2}, incx=1,incy=1, c=cospi(1/6), s=sinpi(1/6)',
            input: {
                n: 2,
                cx: {
                    re: [1, 0],
                    im: [0, 0]
                },
                cy: {
                    re: [0, 1],
                    im: [0, 0]
                },
                c: cospi(1 / 6), //30°
                s: sinpi(1 / 6), //30°
                incx: 1,
                incy: 1
            },
            output: {
                cx: {
                    re: [0.866025403784439, 0.500000000000000],
                    im: [0, 0]//,[0.500000000000000, 0.866025403784439]
                },
                cy: {
                    re: [-0.500000000000000, 0.866025403784439],
                    im: [0, 0]//[0.866025403784439, -0.500000000000000]
                }
            },
        },
        case1: {
            desc: 'csrot n=2, cx={2}, cy={2}, incx=-1,incy=-1, c=cospi(1/6), s=sinpi(1/6)',
            input: {
                n: 2,
                cx: {
                    re: [1, 0],
                    im: [0, 0]
                },
                cy: {
                    re: [0, 1],
                    im: [0, 0]
                },
                c: cospi(1 / 6), //30°
                s: sinpi(1 / 6), //30°
                incx: -1,
                incy: -1
            },
            output: {
                cx: {
                    re: [0.866025403784439, 0.500000000000000],
                    im: [0, 0]//,[0.500000000000000, 0.866025403784439]
                },
                cy: {
                    re: [-0.500000000000000, 0.866025403784439],
                    im: [0, 0]//[0.866025403784439, -0.500000000000000]
                }
            },
        },
        case2: {
            desc: 'csrot n=0, cx={2}, cy={2}, incx=-1,incy=-1, c=cospi(1/6), s=sinpi(1/6)',
            input: {
                n: 0,
                cx: {
                    re: [1, 0],
                    im: [0, 0]
                },
                cy: {
                    re: [0, 1],
                    im: [0, 0]
                },
                c: cospi(1 / 6), //30°
                s: sinpi(1 / 6), //30°
                incx: -1,
                incy: -1
            },
            output: {
                cx: {
                    re: [1, 0],
                    im: [0, 0]
                },
                cy: {
                    re: [0, 1],
                    im: [0, 0]
                },
            },
        },
    },
    csrotError: {
        case0: {
            desc: 'fail because cx imaginary part missing',
            input: {
                n: 0,
                cx: {
                    re: [1, 0],
                },
                cy: {
                    re: [0, 1],
                    im: [0, 0]
                },
                c: cospi(1 / 6), //30°
                s: sinpi(1 / 6), //30°
                incx: -1,
                incy: -1
            },
        },
        case1: {
            desc: 'fail because cy imaginary part missing',
            input: {
                n: 0,
                cx: {
                    re: [1, 0],
                    im: [0, 0]
                },
                cy: {
                    re: [0, 1],
                },
                c: cospi(1 / 6), //30°
                s: sinpi(1 / 6), //30°
                incx: -1,
                incy: -1
            },
        },
    },
    csscal: {
        case0: {
            desc: 'csscal n=6, cx={6}, incx=1',
            input: {
                n: 6,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                incx: 1,
                sa: 2
            },
            output: {
                cx: {
                    re: [2, 4, 6, 8, 10, 12],
                    im: [14, 16, 18, 20, 22, 24]
                }
            },
        },
        case1: {
            desc: 'csscal n=3, cx={6}, incx=2',
            input: {
                n: 3,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                incx: 2,
                sa: 2
            },
            output: {
                cx: {
                    re: [2, 2, 6, 4, 10, 6],
                    im: [14, 8, 18, 10, 22, 12]
                }
            },
        },
        case2: {
            desc: 'csscal n=3, cx={6}, incx=-1',
            input: {
                n: 3,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                incx: -1,
                sa: 2
            },
            output: {
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                }
            },
        },
        case3: {
            desc: 'csscal n=0, cx={6}, incx=1',
            input: {
                n: 0,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                incx: 1,
                sa: 2
            },
            output: {
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                }
            },
        },
        case4: {
            desc: 'csscal n=6, sa=0, incx=1',
            input: {
                n: 6,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                incx: 1,
                sa: 0
            },
            output: {
                cx: {
                    re: [0, 0, 0, 0, 0, 0],
                    im: [0, 0, 0, 0, 0, 0]
                }
            },
        },
    },
    csscalError: {
        case0: {
            desc: 'fail because cx imaginary part missing',
            input: {
                n: 6,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                },
                incx: 1,
                sa: 2
            }
        },
    },
    cswap: {
        case0: {
            desc: 'csscal n=6, cx={6}, cy={6} incx=1, incy=1',
            input: {
                n: 6,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                cy: {
                    re: [13, 23, 33, 43, 53, 63],
                    im: [74, 84, 94, 104, 114, 124]
                },
                incx: 1,
                incy: 1,
            },
            output: {
                cy: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                cx: {
                    re: [13, 23, 33, 43, 53, 63],
                    im: [74, 84, 94, 104, 114, 124]
                },
            },
        },
        case1: {
            desc: 'csscal [reverse cx,cy on swap) incx=-1, incy=1',
            input: {
                n: 6,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                cy: {
                    re: [13, 23, 33, 43, 53, 63],
                    im: [74, 84, 94, 104, 114, 124]
                },
                incx: -1,
                incy: 1,
            },
            output: {
                cy: {
                    re: [1, 2, 3, 4, 5, 6].reverse(),
                    im: [7, 8, 9, 10, 11, 12].reverse()
                },
                cx: {
                    re: [13, 23, 33, 43, 53, 63].reverse(),
                    im: [74, 84, 94, 104, 114, 124].reverse()
                },
            },
        },
        case2: {
            desc: 'csscal [reverse cy,cx on swap] incx=1, incy=-1',
            input: {
                n: 6,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                cy: {
                    re: [13, 23, 33, 43, 53, 63],
                    im: [74, 84, 94, 104, 114, 124]
                },
                incx: 1,
                incy: -1,
            },
            output: {
                cy: {
                    re: [1, 2, 3, 4, 5, 6].reverse(),
                    im: [7, 8, 9, 10, 11, 12].reverse()
                },
                cx: {
                    re: [13, 23, 33, 43, 53, 63].reverse(),
                    im: [74, 84, 94, 104, 114, 124].reverse()
                },
            },
        },
        case3: {
            desc: 'csscal n=0, no swap',
            input: {
                n: 0,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                cy: {
                    re: [13, 23, 33, 43, 53, 63],
                    im: [74, 84, 94, 104, 114, 124]
                },
                incx: 1,
                incy: -1,
            },
            output: {
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                cy: {
                    re: [13, 23, 33, 43, 53, 63],
                    im: [74, 84, 94, 104, 114, 124]
                },
            },
        },
    },
    cswapError: {
        case0: {
            desc: 'fail because cx imaginary part missing',
            input: {
                n: 6,
                cx: {
                    re: [1, 2, 3, 4, 5, 6]
                },
                cy: {
                    re: [13, 23, 33, 43, 53, 63],
                    im: [74, 84, 94, 104, 114, 124]
                },
                incx: 1,
                incy: -1,
            }
        },
        case1: {
            desc: 'fail because cy imaginary part missing',
            input: {
                n: 6,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                cy: {
                    re: [13, 23, 33, 43, 53, 63],

                },
                incx: 1,
                incy: -1,
            }
        },
    },
    icamax: {
        case0: {
            desc: 'icamx n=6, incx=1',
            input: {
                n: 6,
                cx: {
                    re: [1, 0, 3, 4, 5, 6],
                    im: [7, 0, 9, 10, 11, 12]
                },
                incx: 1,
            },
            output: {
                max: 6
            },
        },
        case1: {
            desc: 'icamx n=3, incx=2',
            input: {
                n: 3,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                incx: 2,
            },
            output: {
                max: 5
            },
        },
        case2: {
            desc: 'icamx n=3, incx=-1',
            input: {
                n: 6,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                incx: -1,
            },
            output: {
                max: 0
            },
        },
        case3: {
            desc: 'icamx n=0, incx=1',
            input: {
                n: 0,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                incx: 1,
            },
            output: {
                max: 0
            },
        },
        case4: {
            desc: 'icamx n=1, incx=1',
            input: {
                n: 1,
                cx: {
                    re: [1, 0, 3, 4, 5, 6],
                    im: [7, 1, 9, 10, 11, 12]
                },
                incx: 1,
            },
            output: {
                max: 1
            },
        },
    },
    icamaxError: {
        case0: {
            desc: 'fail because cx imaginary part missing',
            input: {
                n: 6,
                cx: {
                    re: [1, 2, 3, 4, 5, 6]
                },
                incx: 1
            }
        },
    },
    scasum: {
        case0: {
            desc: 'scasum n=6, incx=1',
            input: {
                n: 6,
                cx: {
                    re: [1, 0, 3, 4, 5, 6],
                    im: [7, 0, 9, 10, 11, 12]
                },
                incx: 1,
            },
            output: {
                sum: 1 + 3 + 4 + 5 + 6 + 7 + 9 + 10 + 11 + 12
            },
        },
        case1: {
            desc: 'scasum n=3, incx=2',
            input: {
                n: 3,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                incx: 2,
            },
            output: {
                sum: 1 + 3 + 5 + 7 + 9 + 11
            },
        },
        case2: {
            desc: 'scasum n=0, incx=2',
            input: {
                n: 0,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                incx: 2,
            },
            output: {
                sum: 0
            },
        },
        case3: {
            desc: 'scasum n=3, incx=0',
            input: {
                n: 0,
                cx: {
                    re: [1, 2, 3, 4, 5, 6],
                    im: [7, 8, 9, 10, 11, 12]
                },
                incx: 0,
            },
            output: {
                sum: 0
            },
        },
    },
    scasumError: {
        case0: {
            desc: 'fail because cx imaginary part missing',
            input: {
                n: 6,
                cx: {
                    re: [1, 2, 3, 4, 5, 6]
                },
                incx: 1
            }
        },
    },
}
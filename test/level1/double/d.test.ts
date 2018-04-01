import { assert, expect } from 'chai';
import * as blas from '../../../src/lib';
import { approximitly } from '../../test-helpers';
import { fixture } from './fixtures';

const {
  util: { arrayrify, numberPrecision, each, multiplexer, fortranArrComplex64, complex, muxCmplx },
  level1: {
    isamax,
    sasum,
    scnrm2,
    scopy,
    sdot,
    sdsdot,
    snrm2,
    srot,
    srotg,
    srotm,
    srotmg,
    sscal,
    sswap,
    saxpy
  }
} = blas;

const { abs } = Math;
const { isNaN, isFinite } = Number;

describe('blas level 1 single/double precision', function n() {

  describe('isamax', () => {

    const { isamax: testData } = fixture;

    each(testData)(({ input: { n, cx: x, incx }, output: { max }, desc }, key) => {

      it(`[${key}]/[${desc}]`, function t() {

        const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
        const result = isamax(n, cx, incx);
        multiplexer(result, max)(approximitly);

      });
    });
  });

  describe('sasum', () => {
    describe('data tests', () => {
      const { sasum: testData } = fixture;

      each(testData)(({ input: { n, cx: x, incx }, output: { sum }, desc }, key) => {
        it(`[${key}]/[${desc}]`, function t() {
          const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
          const result = sasum(n, cx, incx);
          multiplexer(result, sum)(approximitly);
        });
      });
    });
  });

  describe('saxpy', () => {

    describe('data tests', () => {
      const { saxpy: testData } = fixture;
      each(testData)(({ input: { n, cx: x, cy: y, sa, c, incx, incy }, output: { re: ore, im: oim }, desc }, key) => {

        it(`[${key}]/[${desc}]`, function t() {

          const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
          const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
          const res = fortranArrComplex64(muxCmplx(ore, oim))();

          saxpy(n, sa, cx, incx, cy, incy);
          multiplexer(cy.toArr(), res.toArr())(approximitly);
        });
      });
    });
  });
  describe('scnrm2', () => {

    describe('data tests', () => {
      const { scnrm2: testData } = fixture;
      each(testData)(({ input: { n, x, incx }, output, desc }, key) => {

        it(`[${key}]/[${desc}]`, function t() {

          const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();

          const result = scnrm2(n, cx, incx);
          multiplexer(result, output)(approximitly);
        });
      });
    });
  });
  describe('ccopy', () => {
    describe('data tests', () => {

      const { scopy: testData } = fixture;
      each(testData)(({ input: { n, x, y, incx, incy }, output: out, desc }, key) => {

        it(`[${key}]/[${desc}]`, function t() {

          const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
          const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
          const expected = fortranArrComplex64(muxCmplx(out.re, out.im))();

          scopy(n, cx, incx, cy, incy);
          multiplexer(cy.toArr(), expected.toArr())(approximitly);
        });
      });
    });
  });
  describe('sdot', () => {
    describe('data tests', () => {

      const { sdot: testData } = fixture;
      each(testData)(({ input: { n, sx, sy, incx, incy }, output: out, desc }, key) => {

        it(`[${key}]/[${desc}]`, function t() {

          const cx = fortranArrComplex64(muxCmplx(sx.re, sx.im))();
          const cy = fortranArrComplex64(muxCmplx(sy.re, sy.im))();
          const result = sdot(n, cx, incx, cy, incy);

          approximitly(result, out);
        });
      });
    });
  });
  describe('sdsdot', () => {
    describe('data tests', () => {

      const { sdsdot: testData } = fixture;
      each(testData)(({ input: { n, sb, sx, sy, incx, incy }, output: out, desc }, key) => {

        it(`[${key}]/[${desc}]`, function t() {

          const cx = fortranArrComplex64(muxCmplx(sx.re, sx.im))();
          const cy = fortranArrComplex64(muxCmplx(sy.re, sy.im))();
          const result = sdsdot(n, sb, cx, incx, cy, incy);

          approximitly(result, out);
        });
      });
    });
  });
  describe('snrm2', () => {
    describe('data tests', () => {

      const { snrm2: testData } = fixture;
      each(testData)(({ input: { n, x, incx }, output: out, desc }, key) => {

        it(`[${key}]/[${desc}]`, function t() {

          const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
          const result = snrm2(n, cx, incx);

          approximitly(result, out);
        });
      });
    });
  });
  describe('srot', () => {
    describe('data tests', () => {

      const { srot: testData } = fixture;
      each(testData)(({ input, input: { n, x, y, incy, incx, c, s }, output: out, desc }, key) => {

        it(`[${key}]/[${desc}]`, function t() {

          const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
          const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
          srot(n, cx, incx, cy, incy, c, s);



          multiplexer(out.x, cx.toArr())(approximitly);
          multiplexer(out.y, cy.toArr())(approximitly);
        });
      });
    });
  });

  describe('srotg', () => {
    describe('data tests', () => {

      const { srotg: testData } = fixture;
      each(testData)(({ input: { sa, sb }, output: expect, desc }, key) => {

        it(`[${key}]/[${desc}]`, function t() {

          const p = { sa, sb, c: 0, s: 0 };
          srotg(p);
          const { c, s, sa: asa, sb: asb } = p;
          const { c: ec, s: es, sa: esa, sb: esb } = expect;
          multiplexer([c, s, asa, asb], [ec, es, esa, esb])(approximitly);
        });
      });
    });
  });
  describe('srotm', () => {
    describe('data tests', () => {

      const { srotm: testData } = fixture;
      each(testData)(({ input: { n, sx, sy, incx, incy, sparam }, output: expect, desc }, key) => {
        it(`[${key}]/[${desc}]`, function t() {
          const x = fortranArrComplex64(muxCmplx(sx))();
          const y = fortranArrComplex64(muxCmplx(sy))();
          const spar = fortranArrComplex64(muxCmplx(sparam))();
          srotm(n, x, incx, y, incy, spar);
          multiplexer(x.toArr(), expect.x)(approximitly);
          multiplexer(y.toArr(), expect.y)(approximitly);
          /*console.log({
            x: x.toArr(),
            y: y.toArr(),
            ex: expect.x,
            ey: expect.y
          });*/
        });
      });
    });
  });

  describe('srotmg', () => {
    describe('data tests', () => {

      const { srotmg: testData } = fixture;
      each(testData)(({ input, output: expect, desc }, key) => {

        it(`[${key}]/[${desc}]`, function t() {
          input.sparam = fortranArrComplex64(muxCmplx(input.sparam, undefined))();

          srotmg(input);
          const { sd1, sd2, sx1, sy1, sparam } = input;
          const { sd1: esd1, sd2: esd2, sx1: esx1, sy1: esy1, sparam: esparam } = expect;
          multiplexer([sd1, sd2, sx1, sy1], [esd1, esd2, esx1, esy1])(approximitly);
          multiplexer(sparam.toArr(), expect)(approximitly);
        });
      });
    });
  });

  describe('sscal', () => {
    describe('data tests', () => {

      const { sscal: testData } = fixture;
      each(testData)(({ input: { n, sa, sx, incx }, output: expect, desc }, key) => {

        it(`[${key}]/[${desc}]`, function t() {
          const x = fortranArrComplex64(muxCmplx(sx))();
          sscal(n, sa, x, incx);
          //console.log({ x: x.toArr(), x2: expect.x });
          multiplexer(x.toArr(), expect.x)(approximitly);
        });
      });
    });
  });
  describe('sswap', () => {
    describe('data tests', () => {

      const { sswap: testData } = fixture;
      each(testData)(({ input: { n, sx, incx, sy, incy }, output: expect, desc }, key) => {

        it(`[${key}]/[${desc}]`, function t() {
          //
          const x = fortranArrComplex64(muxCmplx(sx))();
          const y = fortranArrComplex64(muxCmplx(sy))();
          //
          sswap(n, x, incx, y, incy);
          //console.log({ x: x.toArr(), y: expect.x });
          multiplexer(x.toArr(), expect.x)(approximitly);
          multiplexer(y.toArr(), expect.y)(approximitly);
        });
      });
    });
  });
  /*
    describe('caxpy', () => {
      //construct tests for dbeta from fixtures
      //abuse as a for-each loop
      //make sure it is an arrow function for `map` but not an arrow function for `it`
      describe('data tests', () => {
        const { caxpy: testData } = fixture;
        each(testData)(({ input: { n, cx: x, cy: y, ca, c, output: o, incx, incy }, output: { re: ore, im: oim }, desc }, key) => {
  
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
            const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
            const res = fortranArrComplex64(muxCmplx(ore, oim))();
  
            caxpy(n, ca, cx, incx, cy, incy);
            multiplexer(cy.toArr(), res.toArr())(approximitly);
          });
        });
      });
  
      describe('error tests', () => {
        const { caxpyErrors: testData } = fixture;
        each(testData)(({ input: { n, cx: x, cy: y, ca, c, output: o, incx, incy }, desc }, key) => {
  
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
            const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
            const call = () => caxpy(n, ca, cx, incx, cy, incy);
            expect(call).to.throw();
          });
        });
      });
  
    });
  
    describe('ccopy', () => {
      describe('data tests', () => {
  
        const { ccopy: testData } = fixture;
        each(testData)(({ input: { n, cx: x, cy: y, ca, c, output: o, incx, incy }, output: { re: ore, im: oim }, desc }, key) => {
  
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
            const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
            const res = fortranArrComplex64(muxCmplx(ore, oim))();
  
            ccopy(n, cx, incx, cy, incy);
            multiplexer(cy.toArr(), res.toArr())(approximitly);
          });
        });
      });
  
      describe('error tests', () => {
  
        const { ccopyErrors: testData } = fixture;
        each(testData)(({ input: { n, cx: x, cy: y, ca, c, output: o, incx, incy }, desc }, key) => {
  
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
            const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
            const call = () => ccopy(n, cx, incx, cy, incy);
            expect(call).to.throw();
          });
        });
      });
  
    });
  
    describe('cdotc', () => {
  
      describe('data tests', () => {
        const { cdotc: testData } = fixture;
        each(testData)(({ input: { n, cx: x, cy: y, ca, c, output: o, incx, incy }, output: expected, desc }, key) => {
  
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
            const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
            const answer = cdotc(n, cx, incx, cy, incy);
            approximitly(answer, expected);
          });
        });
      });
  
      describe('error tests', () => {
  
        const { cdotcError: testData } = fixture;
        each(testData)(({ input: { n, cx: x, cy: y, ca, c, output: o, incx, incy }, desc }, key) => {
  
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
            const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
            const call = () => cdotc(n, cx, incx, cy, incy);
            expect(call).to.throw();
          });
        });
      });
  
    });
  
    describe('cdotu', () => {
  
      describe('data tests', () => {
        const { cdotu: testData } = fixture;
        each(testData)(({ input: { n, cx: x, cy: y, ca, c, output: o, incx, incy }, output: expected, desc }, key) => {
  
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
            const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
  
            const answer = cdotu(n, cx, incx, cy, incy);
            approximitly(answer, expected);
  
          });
        });
      });
  
  
      describe('error tests', () => {
        const { cdotuError: testData } = fixture;
        each(testData)(({ input: { n, cx: x, cy: y, ca, c, output: o, incx, incy }, desc }, key) => {
  
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
            const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
            const call = () => cdotu(n, cx, incx, cy, incy);
            expect(call).to.throw();
          });
        });
      });
    });
  
    describe('crotg', () => {
      describe('data tests', () => {
        const { crotg: testData } = fixture;
        each(testData)(({ input: { ca: aIn, cb: bIn }, output: { ca, cb, c: cOut, s: sOut }, desc }, key) => {
  
          it(`[${key}]/[${desc}]`, function t() {
            const s = { re: 0, im: 0 };
            const c = { val: 0 };
  
            crotg(aIn, bIn, c, s); // adjusts aIn
            //console.log({ aIn, ca, bIn, cb, c, s, cOut, sOut });
            approximitly(aIn, ca);
            approximitly(bIn, cb);
            approximitly(c.val, cOut);
            approximitly(s, sOut);
          });
        });
      });
  
      describe('cscal', () => {
        describe('data tests', () => {
          const { cscal: testData } = fixture;
          each(testData)(({ input: { n, ca, cx: x, incx }, output: { cx: cxOut }, desc }, key) => {
            it(`[${key}]/[${desc}]`, function t() {
  
              const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
              const result = muxCmplx(cxOut.re, cxOut.im);
  
              cscal(n, ca, cx, incx); // adjusts aIn
  
              multiplexer(cx.toArr(), result)(approximitly);
            });
          });
        });
  
        describe('error tests', () => {
          const { cscalError: testData } = fixture;
          each(testData)(({ input: { n, cx: x, ca, incx }, desc }, key) => {
  
            it(`[${key}]/[${desc}]`, function t() {
  
              const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
              const call = () => cscal(n, ca, cx, incx);
              expect(call).to.throw();
            });
          });
        });
      });
  
      describe('csrot', () => {
        describe('data tests', () => {
          const { csrot: testData } = fixture;
  
          each(testData)(({ input: { n, cx: x, incx, cy: y, incy, c, s }, output: { cx: cxOut, cy: cyOut }, desc }, key) => {
            it(`[${key}]/[${desc}]`, function t() {
  
              const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
              const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
              const cxExpected = muxCmplx(cxOut.re, cxOut.im);
              const cyExpected = muxCmplx(cyOut.re, cyOut.im);
  
              csrot(n, cx, incx, cy, incy, c, s);
  
              multiplexer(cx.toArr(), cxExpected)(approximitly);
              multiplexer(cy.toArr(), cyExpected)(approximitly);
            });
          });
        });
        describe('error tests', () => {
          const { csrotError: testData } = fixture;
          each(testData)(({ input: { n, cx: x, incx, cy: y, incy, c, s }, desc }, key) => {
  
            it(`[${key}]/[${desc}]`, function t() {
  
              const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
              const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
  
              const call = () => csrot(n, cx, incx, cy, incy, c, s);
  
              expect(call).to.throw();
            });
          });
        });
      });
      describe('csscal', () => {
        describe('data tests', () => {
          const { csscal: testData } = fixture;
  
          each(testData)(({ input: { n, cx: x, incx, sa, }, output: { cx: cxOut }, desc }, key) => {
            it(`[${key}]/[${desc}]`, function t() {
  
              const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
              const cxExpected = muxCmplx(cxOut.re, cxOut.im);
  
              csscal(n, sa, cx, incx);
  
              multiplexer(cx.toArr(), cxExpected)(approximitly);
            });
          });
        });
        describe('error tests', () => {
          const { csscalError: testData } = fixture;
          each(testData)(({ input: { n, cx: x, incx, sa, }, desc }, key) => {
  
            it(`[${key}]/[${desc}]`, function t() {
  
              const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
  
              const call = () => csscal(n, sa, cx, incx);
  
              expect(call).to.throw();
            });
          });
        });
      });
  
    });
  
    describe('cswap', () => {
      describe('data tests', () => {
        const { cswap: testData } = fixture;
  
        each(testData)(({ input: { n, cx: x, cy: y, incx, incy }, output: { cx: cxOut, cy: cyOut }, desc }, key) => {
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
            const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
            const cxExpected = muxCmplx(cxOut.re, cxOut.im);
            const cyExpected = muxCmplx(cyOut.re, cyOut.im);
  
            cswap(n, cx, incx, cy, incy);
  
            multiplexer(cx.toArr(), cxExpected)(approximitly);
            multiplexer(cy.toArr(), cyExpected)(approximitly);
          });
        });
      });
      describe('error tests', () => {
        const { cswapError: testData } = fixture;
        each(testData)(({ input: { n, cx: x, cy: y, incx, incy }, desc }, key) => {
  
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
            const cy = fortranArrComplex64(muxCmplx(y.re, y.im))();
            const call = () => cswap(n, cx, incx, cy, incy);
  
            expect(call).to.throw();
          });
        });
      });
    });
    describe('isamax', () => {
  
      const { isamax: testData } = fixture;
  
      each(testData)(({ input: { n, cx: x, incx }, output: { max }, desc }, key) => {
  
        it(`[${key}]/[${desc}]`, function t() {
  
          const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
          const result = isamax(n, cx, incx);
          multiplexer(result, max)(approximitly);
  
        });
      });
    });
  
  
    describe('scasum', () => {
      describe('data tests', () => {
        const { scasum: testData } = fixture;
  
        each(testData)(({ input: { n, cx: x, incx }, output: { sum }, desc }, key) => {
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
            const result = scasum(n, cx, incx);
  
            multiplexer(result, sum)(approximitly);
          });
        });
      });
      describe('error tests', () => {
        const { scasumError: testData } = fixture;
        each(testData)(({ input: { n, cx: x, incx }, desc }, key) => {
  
          it(`[${key}]/[${desc}]`, function t() {
  
            const cx = fortranArrComplex64(muxCmplx(x.re, x.im))();
  
            const call = () => scasum(n, cx, incx);
  
            expect(call).to.throw();
          });
        });
      });
    });*/
});

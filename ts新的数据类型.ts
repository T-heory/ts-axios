
let arr: number[] = [1, 1, 2, 3, 5, 8, 13, 21, 34];;
let arr2: string[] = ['1', '2', '3', '4'];
function fib(num: number): number {
    if (num === 1 || num === 2) {
        return num - 1
    }
    const res = fib(num - 1) + fib(num - 2)
    return res
}
console.log(fib(5));


type Peg = 'A' | 'B' | 'C';
function hanoi(n: number, source: Peg, target: Peg, auxiliary: Peg): void {
    if (n === 1) {
        console.log(`移动盘子 1 从 ${source} 到 ${target}`);
        return;
    }
    hanoi(n - 1, source, auxiliary, target);
    console.log(`移动盘子 ${n} 从 ${source} 到 ${target}`);
    hanoi(n - 1, auxiliary, target, source);
}


hanoi(3, 'A', 'C', 'B');
console.log('————————————————————————————')
hanoi(5, 'A', 'B', 'C')


function swap(i: number, j: number) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
function fastPowRec(a: number, b: number): number {
    if (b === 0) return 1;
    const half = fastPowRec(a, Math.floor(b / 2));
    if (b % 2 === 0) {
        return half * half;
    } else {
        return half * half * a;
    }
}
console.log(fastPowRec(3, 4));




let c: number[] = [13, 4, 56, 7, 19, 2, 6, 14];  //13 4 7 56 19 2 6 14    13 4 7 2 19 56 6 14   13 4 7 2 6 56 19 14    13, 4, 7, 2, 6, 14, 19, 56

function partition(arr: number[], left: number, right: number): number {
    const pivot = arr[right];
    let i = left;
    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[right]] = [arr[right], arr[i]];
    return i;
}
function findKthSmallest(arr: number[], left: number, right: number, k: number): number {
    if (left === right) {
        return arr[left];
    }
    const pivotIndex = partition(arr, left, right);
    const rank = pivotIndex - left + 1;

    if (k === rank) {
        return arr[pivotIndex];
    } else if (k < rank) {
        return findKthSmallest(arr, left, pivotIndex - 1, k);
    } else {
        return findKthSmallest(arr, pivotIndex + 1, right, k - rank);
    }
}

const testArr = [13, 4, 56, 7, 19, 2, 6, 14];
const k = 2;
const result = findKthSmallest([...testArr], 0, testArr.length - 1, k);
console.log(`第 ${k} 小的元素是: ${result}`);

interface Action {
    eating: () => void
}
interface Moving {
    running: () => void
}

class Person implements Action, Moving {
    eating() {
        console.log('hello world');
    }
    running() {
        console.log('world hello');
    }
}
const people = new Person();
people.eating();
people.running();


/* class People extends Person implements Action, Moving {
    eating: () => {
        console.log('hello,world');
}
running: () => {
    console.log('hello,rowld');
}
} */


/**
 * 矩阵连乘动态规划算法
 * @param p 矩阵维度数组。如果有 n 个矩阵，p 的长度为 n+1。
 *          矩阵 Ai 的维度为 p[i-1] x p[i]
 * @returns 包含最小乘法次数表和分割点表的对象
 */
function matrixChainOrder(p: number[]): { m: number[][], s: number[][] } {
    const n = p.length - 1; // 矩阵的数量

    // m[i][j] 表示计算矩阵 Ai...Aj 所需的最小标量乘法次数
    // 初始化为 0，因为对角线 m[i][i] 为 0（单个矩阵无需乘法）
    const m: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    // s[i][j] 记录在哪个位置 k 分割矩阵链 Ai...Aj 能得到最优解
    const s: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

    // l 是链的长度，从 2 开始（两个矩阵相乘）到 n
    for (let l = 2; l <= n; l++) {
        // i 是链的起始索引
        for (let i = 1; i <= n - l + 1; i++) {
            // j 是链的结束索引
            const j = i + l - 1;

            // 初始化为无穷大
            m[i][j] = Infinity;

            // 尝试在 k 处分割，k 从 i 到 j-1
            for (let k = i; k < j; k++) {
                // q = 左部分代价 + 右部分代价 + 合并两部分的代价
                // 合并代价: p[i-1] * p[k] * p[j]
                const q = m[i][k] + m[k + 1][j] + p[i - 1] * p[k] * p[j];

                if (q < m[i][j]) {
                    m[i][j] = q;
                    s[i][j] = k;
                }
            }
        }
    }

    return { m, s };
}

/**
 * 递归打印最优括号方案
 * @param s 分割点表
 * @param i 起始矩阵索引
 * @param j 结束矩阵索引
 */
function printOptimalParens(s: number[][], i: number, j: number): string {
    if (i === j) {
        return `A${i}`;
    } else {
        const left = printOptimalParens(s, i, s[i][j]);
        const right = printOptimalParens(s, s[i][j] + 1, j);
        return `(${left}${right})`;
    }
}

// --- 测试用例 ---

// 假设我们有 6 个矩阵，维度如下：
// A1: 30x35, A2: 35x15, A3: 15x5, A4: 5x10, A5: 10x20, A6: 20x25
// 对应的 p 数组为: [30, 35, 15, 5, 10, 20, 25]
const dimensions = [30, 35, 15, 5, 10, 20, 25];

console.log("矩阵维度数组 p:", dimensions);

const { m, s } = matrixChainOrder(dimensions);

const n = dimensions.length - 1;
console.log(`最小标量乘法次数: ${m[1][n]}`);
console.log(`最优计算顺序: ${printOptimalParens(s, 1, n)}`);

/* 
预期输出:
最小标量乘法次数: 15125
最优计算顺序: ((A1(A2A3))((A4A5)A6))
*/


export { }
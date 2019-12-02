<template>
  <v-container>
    <v-row justify="center">
      <v-col class="py-0" cols="12">
        <v-card>
          <v-card-text class="markdown-body">
            <h2 class="purple--text">
              帮助
            </h2>
            <h3 class="purple--text">
              编译系统
            </h3>
            <p>
              BITOJ 使用三元组（语言，环境，版本）来唯一性地标识每一个受支持的语言及其运行环境。例如，
              <code>(C++, Clang, 11)</code> 表示 C++ 程序设计语言，使用
              <code>clang</code> 编译器，支持 C++11 相关语言特性。
            </p>
            <v-data-table :headers="headers" :items="items" disable-pagination hide-default-footer />
            <p>
              <b>Java 运行环境提示：</b>您的 Java 源程序必须包含一个名称为
              <code>Main</code> 的公共主类
              <code>public class</code>，否则系统将无法顺利评测您的程序。
            </p>
            <h3 class="purple--text">
              编译参数
            </h3>
            <p>
              对于 C/C++ 程序设计语言，您的程序在编译时将通过编译器的
              <code>-D</code> 选项被注入预处理符号
              <code>ONLINE_JUDGE</code>。您的程序中可以使用如下的预处理器指令来动态调整将在评测端编译的代码段：
            </p>
            <pre><code class="language-cpp" lang="cpp">#ifdef ONLINE_JUDGE
// Code here will be compiled when judged.
#else
// Code here will not be compiled when judged.
#endif</code></pre>
            <p>
              对于 Rust 程序设计语言，您的程序在编译时将通过编译器的
              <code>--cfg</code> 选项被注入配置
              <code>oj</code>。您的程序中可以使用如下的注解来动态调整将在评测端编译的代码段：
            </p>
            <pre><code class="language-rust" lang="rust">#[cfg(oj)]
fn this_function_will_only_be_compiled_when_judged() {
  // Do something wonderful.
}</code></pre>
            <p>对于其他程序设计语言，我们无法在编译期提供条件编译手段。</p>
            <h3 class="purple--text">
              运行环境
            </h3>
            <p>
              您提交的程序被评测器执行时均会被注入环境变量
              <code>ONLINE_JUDGE</code>，其值永远为
              <code>TRUE</code>。您可以使用如下的 Python 语言片段判断您的程序是否处在评测端：
            </p>
            <pre><code class="language-python" lang="python">import os
if (os.getenv(&#39;ONLINE_JUDGE&#39;) == &#39;TRUE&#39;):
  # Your code is under judge.
  do_something_wonderful()
else:
  # Your code is NOT under judge.
  do_something_else()</code></pre>
            <p>您可以使用如下的 Java 语言片段判断您的程序是否处在评测端：</p>
            <pre><code class="language-java" lang="java">String oj = System.getenv(&quot;ONLINE_JUDGE&quot;);
if (oj == null || !oj.equals(&quot;TRUE&quot;)) {
  // Your code is NOT under judge.
  doSomething();
} else {
  // Your code is under judge.
  doSomethingWonderful();
}</code></pre>
            <h3 class="purple--text">
              评测模式
            </h3>
            <p>
              BITOJ 现支持两种评测模式：
              <code>Standard</code> 模式和
              <code>Special Judge</code> 模式，未来将加入对
              <code>Interactive</code> 模式的支持。
            </p>
            <ul>
              <li>
                在 Standard 模式下，用户的程序的输出将会与命题人提供的标准输出进行逐 Token 的比较，所有仅在空白字符位置的差异将被忽略。Standard 模式不会对每个 token 的语义进行任何分析，因此由于浮点误差而带来的错误在 Standard 模式下会被判定为无法通过。
              </li>
              <li>
                在 Special Judge 模式下，用户的程序的输出将会连同测试用例的输入和标准输出被输入到由命题人提供的一个答案检查器程序中，由命题人编写的答案检查器对用户的输出进行检查。为了提高命题效率，减少答案检查器错误惨案的发生，请命题人使用
                <code>WaveTestLib</code> 编写答案检查器。具体方法请参考
                <code>WaveTestLib</code> 的文档。
              </li>
            </ul>
            <h3 class="purple--text">
              评测结果
            </h3>
            <p>评测端将可能产生如下几种评测结果：</p>
            <ul>
              <li>Pending：您的程序正在评测队列中等待评测，请您耐心等待。</li>
              <li>Compilation Error：编译器无法编译您的程序。评测系统将会返回编译器的错误输出，请参照编译器的错误输出检查您的源程序，修正任何的语法错误。</li>
              <li>Judging：您的代码已经被成功编译，正在执行评测。</li>
              <li>Accepted：恭喜，您的程序通过了所有的测试点。</li>
              <li>Wrong Answer：您的程序在某些测试点上输出了错误的答案。</li>
              <li>Runtime Error：您的程序在某些测试点上异常退出。通常情况下可能导致该问题的原因很多，例如数组访问越界、试图访问空指针（<code>nullptr</code>、<code>null</code>、<code>None</code>）、试图调用敏感的系统调用等。</li>
              <li>Time Limit Exceeded：您的程序在某些测试点上没有在规定的时间范围内正常退出。请检查您程序中使用的算法，确保其时间开销符合要求。</li>
              <li>Memory Limit Exceeded：您的程序在某些测试点上使用了超过限制范围的内存。请检查您程序中对内存的分配和使用情况，确保其空间开销符合要求。</li>
              <li>Idleness Limit Exceeded：您的程序对 CPU 的占用时间虽然没有超过限制，但其实际运行时间太长，超过了阈值。请检查您的程序是否触发了任何形式的死锁、长时间阻塞等；如果您提交的题目是一道交互题，请您务必检查您的程序是否正确地 flush 了底层输出缓冲区。</li>
              <li>Judgement Failed：评测系统貌似出现了严重的问题导致其无法继续评测您的程序。当您发现系统向您返回这一个评测结果时，请尽快联系 BITOJ 管理员以解决问题。</li>
            </ul>
            <h3 class="purple--text">
              常见问题
            </h3>
            <p>
              <b>问题一：我如何读取输入，我又该如何输出计算结果？能否以解决经典的 Two Sum 问题为例给出样例代码？</b>
            </p>
            <p>您的程序应总是从标准输入流中读取输入，向标准输出流中写入输出结果。您的程序向标准错误流中写入的任何结果均会被评测系统丢弃，且不会被记录。</p>
            <p v-katex:auto>
              Two Sum 问题即为读入两个正整数（均不超过 \(10^9\)），输出它们的加和。下面给出以不同语言实现的解决该问题的示例代码。
            </p>
            <p>C 语言：</p>
            <pre><code class="language-c" lang="c">#include &lt;stdio.h&gt;
int main() {
    int a, b;
    scanf(&quot;%d%d&quot;, &amp;a, &amp;b);
    printf(&quot;%d\n&quot;, a + b);
    return 0;
}</code></pre>
            <p>C++：</p>
            <pre><code class="language-cpp" lang="cpp">#include &lt;iostream&gt;
int main() {
    int a, b;
    std::cin &gt;&gt; a &gt;&gt; b;
    std::cout &lt;&lt; a + b &lt;&lt; std::endl;
    return 0;
}</code></pre>
            <p>Python：</p>
            <pre><code class="language-python" lang="python">print(sum(map(int, input().split(&#39; &#39;))))</code></pre>
            <p>其他语言的示例类似。</p>
            <p>
              <strong>问题二：在 C/C++ 中如何使用 64 位整数类型？</strong>
            </p>
            <p>
              您可以使用
              <code>long long int</code> 类型声明 64 位有符号整数类型。另外，推荐使用 C++ 标准头文件
              <code>cstdint</code>（C 语言中为
              <code>stdint.h</code>），其中定义了从 8 位整数到 64 位整数的
              <code>typedef</code>。例如，您可以使用
              <code>cstdint</code> 中定义的
              <code>int64_t</code> 类型定义 64 位有符号整数类型。
            </p>
            <p>
              64 位有符号整数类型请使用
              <code>%lld</code> 格式说明符进行输入和输出。
            </p>
            <p>
              <strong>问题三：各个编译器的编译选项分别是什么？</strong>
            </p>
            <p>
              C/C++ 统一采用如下的编译命令：
              <code>CC -O2 -std={std} -DONLINE_JUDGE -o {output} {source}</code>
              其中 <code>CC</code> 为 <code>gcc</code>，<code>g++</code>，<code>clang</code> 或 <code>clang++</code>；<code>{std}</code> 表示标准级别，<code>{output}</code> 表示输出文件路径，<code>{source}</code> 表示输入文件路径。（下同）
            </p>
            <p>
              Rust 编译器采用如下的编译命令：
              <code>rustc -C opt-level=2 --cfg online_judge -o {output} {source}</code>
            </p>
            <p>
              Java 采用如下的编译命令：
              <code>javac -d {output} {source}</code>
            </p>
            <p>
              Python 语言采用如下的命令直接解释运行：
              <code>ONLINE_JUDGE=TRUE python -OO -B {source}</code>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      headers: [
        {
          text: '语言',
          align: 'center',
          sortable: false,
          value: 'language'
        },
        {
          text: '环境',
          align: 'center',
          sortable: false,
          value: 'environment'
        },
        {
          text: '版本',
          align: 'center',
          sortable: false,
          value: 'version'
        },
        {
          text: '版本',
          align: 'center',
          sortable: false,
          value: 'version'
        },
        {
          text: '标识',
          align: 'center',
          sortable: false,
          value: 'identification'
        },
        {
          text: '备注',
          sortable: false,
          value: 'comment'
        }
      ],
      items: [
        { language: 'C', environment: 'GNU', version: '89', identification: 'gcc 89', comment: 'C 程序设计语言，使用 GNU GCC 编译器，支持 C89 语言特性（ANSI C）' },
        { language: 'C', environment: 'GNU', version: '95', identification: 'gcc 95', comment: 'C 程序设计语言，使用 GNU GCC 编译器，支持 C95 语言特性' },
        { language: 'C', environment: 'GNU', version: '99', identification: 'gcc 99', comment: 'C 程序设计语言，使用 GNU GCC 编译器，支持 C99 语言特性' },
        { language: 'C', environment: 'GNU', version: '11', identification: 'gcc 11', comment: 'C 程序设计语言，使用 GNU GCC 编译器，支持 C11 语言特性' },
        { language: 'C', environment: 'GNU', version: '17', identification: 'gcc 17', comment: 'C 程序设计语言，使用 GNU GCC 编译器，支持 C17 语言特性' },
        { language: 'C', environment: 'clang', version: '89', identification: 'clang 89', comment: 'C 程序设计语言，使用 Clang 编译器，支持 C89 语言特性（ANSI C）' },
        { language: 'C', environment: 'clang', version: '95', identification: 'clang 95', comment: 'C 程序设计语言，使用 Clang 编译器，支持 C95 语言特性' },
        { language: 'C', environment: 'clang', version: '99', identification: 'clang 99', comment: 'C 程序设计语言，使用 Clang 编译器，支持 C99 语言特性' },
        { language: 'C', environment: 'clang', version: '11', identification: 'clang 11', comment: 'C 程序设计语言，使用 Clang 编译器，支持 C11 语言特性' },
        { language: 'C', environment: 'clang', version: '17', identification: 'clang 17', comment: 'C 程序设计语言，使用 Clang 编译器，支持 C17 语言特性' },
        { language: 'C++', environment: 'GNU', version: '98', identification: 'g++ 98', comment: 'C++ 程序设计语言，使用 GNU G++ 编译器，支持 C++98 语言特性' },
        { language: 'C++', environment: 'GNU', version: '03', identification: 'g++ 03', comment: 'C++ 程序设计语言，使用 GNU G++ 编译器，支持 C++03 语言特性' },
        { language: 'C++', environment: 'GNU', version: '11', identification: 'g++ 11', comment: 'C++ 程序设计语言，使用 GNU G++ 编译器，支持 C++11 语言特性' },
        { language: 'C++', environment: 'GNU', version: '14', identification: 'g++ 14', comment: 'C++ 程序设计语言，使用 GNU G++ 编译器，支持 C++14 语言特性' },
        { language: 'C++', environment: 'GNU', version: '17', identification: 'g++ 17', comment: 'C++ 程序设计语言，使用 GNU G++ 编译器，支持 C++17 语言特性' },
        { language: 'C++', environment: 'Clang', version: '98', identification: 'clang++ 98', comment: 'C++ 程序设计语言，使用 Clang++ 编译器，支持 C++98 语言特性' },
        { language: 'C++', environment: 'Clang', version: '03', identification: 'clang++ 03', comment: 'C++ 程序设计语言，使用 Clang++ 编译器，支持 C++03 语言特性' },
        { language: 'C++', environment: 'Clang', version: '11', identification: 'clang++ 11', comment: 'C++ 程序设计语言，使用 Clang++ 编译器，支持 C++11 语言特性' },
        { language: 'C++', environment: 'Clang', version: '14', identification: 'clang++ 14', comment: 'C++ 程序设计语言，使用 Clang++ 编译器，支持 C++14 语言特性' },
        { language: 'C++', environment: 'Clang', version: '17', identification: 'clang++ 17', comment: 'C++ 程序设计语言，使用 Clang++ 编译器，支持 C++17 语言特性' },
        { language: 'Python', environment: 'CPython', version: '3.6', identification: 'CPython 3.6', comment: 'Python 程序设计语言，使用 CPython 解释器实现，支持 Python3.6 语言特性' },
        { language: 'Python', environment: 'CPython', version: '3.7', identification: 'CPython 3.7', comment: 'Python 程序设计语言，使用 CPython 解释器实现，支持 Python3.7 语言特性' },
        { language: 'Python', environment: 'CPython', version: '3.8', identification: 'CPython 3.8', comment: 'Python 程序设计语言，使用 CPython 解释器实现，支持 Python3.8 语言特性' },
        { language: 'Java', environment: 'JSE', version: '10.0', identification: 'Java SE 10.0', comment: 'Java 程序设计语言，使用 JavaSE 运行环境，支持 JDK 1.10 特性' },
        { language: 'Rust', environment: 'Rust', version: '1.31', identification: 'Rust 1.31', comment: 'Rust 程序设计语言，支持 Rust 1.31 特性' }
      ]
    }
  }
}
</script>

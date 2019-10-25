<template>
  <div class="container"><br>
  <h2>帮助</h2>
  <h4>编译系统</h4>
  <p>C 使用 <code>clang</code> 编译，命令为 <code>clang source_file.c -o exec_file -O2 -lm -DONLINE_JUDGE -mx32</code>；<br>
  C++ 使用 <code>clang++</code> 或 <code>g++</code> 编译，命令形如 <code>clang++/g++ source_file.cpp -o exec_file -O2 -lm -DONLINE_JUDGE -mx32 -std=c++11</code>；<br>
  Java 编译时会自动检测您的代码中 <code>public class</code>，如果您的代码中没有 <code>public class</code>，请将入口类命名为 <code>Main</code>。</p>

  <h4>评测系统</h4>
  <p>您提交的代码在 BIT Online Judge 的评测结果可能为以下几种：
    <ul>
      <li><a class="sol_queued">Pending</a>：您的提交正在评测队列中，等待程序编译；</li>
      <li><a class="sol_compiled_failed">Compiled Error</a>：您提交的代码无法在 Online Judge 的编译系统中成功编译，请检查代码中是否存在语法错误；</li>
      <li><a class="sol_judging">Judging</a>：代码编译完成，正在评测中；</li>
      <li><a class="sol_correct">Accepted</a>：答案正确，程序通过了所有的测试点；</li>
      <li><a class="sol_incorrect">Wrong Answer</a>：答案错误，程序在某些测试点上输出了错误的答案。</li>
    </ul>
  </p>  

  <h4>FAQ</h4>
  <h5>程序运行的输入输出流是什么？</h5>
  <p>您代码的输入流可以从 <code>stdin</code>（标准输入流）进行输入，输出流可以从 <code>stdout</code>（标准输出流）进行输出。例如，在 C 语言代码中可以使用 <code>scanf</code> 函数进行输入，使用 <code>printf</code> 函数进行输出；在 C++ 代码中可以使用 <code>cin</code> 进行输入，使用 <code>cout</code> 进行输出。</p>
  
  <h5>在 C++ 中如何使用 64 位整数类型？</h5>
  <p>您可以使用 <code>long long</code> 进行声明，同时使用 <code>cin/cout</code> 或在输入/输出函数 <code>scanf/printf</code> 中使用 <code>%lld</code> 进行输入输出。请避免使用 <code>__int64</code> 的类型声明。</p>
  
  <h5>BIT Online Judge 如何计算程序的运行时间？</h5>
  <p>BIT Online Judge 的评测法官 Jury 会使用不同的测试点多次测试运行您代码编译的程序。如果您的程序在每个测试点中都能在时间限制内给出正确答案，则显示的运行时间为所有测试点耗费的运行时间的最大值，否则该属性无意义。</p>
  </div>
</template>
<script>
export default {
    
}
</script>

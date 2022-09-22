import 'expression.dart';

/// A visitor that produces an unambiguous string representation of the AST.
class AstPrinter implements ExpressionVisitor<String> {
  const AstPrinter();
  String print(Expression expression) {
    return expression.accept(this);
  }

  @override
  String visitBinaryExpression(BinaryExpression expression) {
    return _parenthesis(
      expression.operator.lexeme,
      [expression.left, expression.right],
    );
  }

  @override
  String visitGroupingExpression(GroupingExpression expression) {
    return _parenthesis('group', [expression.expression]);
  }

  @override
  String visitLiteralExpression(LiteralExpression expression) {
    if (expression.value == null) {
      return 'null';
    }
    return expression.value.toString();
  }

  @override
  String visitUnaryExpression(UnaryExpression expression) {
    return _parenthesis(expression.operator.lexeme, [expression.right]);
  }

  String _parenthesis(String name, Iterable<Expression> expressions) {
    final buffer = StringBuffer();
    buffer
      ..write('(')
      ..write(name);

    for (final expression in expressions) {
      buffer
        ..write(' ')
        ..write(expression.accept(this));
    }
    buffer.write(')');
    return buffer.toString();
  }

  @override
  String visitVariableExpression(VariableExpression expression) {
    // TODO: implement visitVariableExpression
    throw UnimplementedError();
  }

  @override
  String visitAssignExpression(AssignExpression expression) {
    // TODO: implement visitAssignExpression
    throw UnimplementedError();
  }

  @override
  String visitLogicalExpression(LogicalExpression expression) {
    // TODO: implement visitLogicalExpression
    throw UnimplementedError();
  }

  @override
  String visitCallExpression(CallExpression expression) {
    // TODO: implement visitCallExpression
    throw UnimplementedError();
  }

  @override
  String visitGetExpression(GetExpression expression) {
    // TODO: implement visitGetExpression
    throw UnimplementedError();
  }

  @override
  String visitSetExpression(SetExpression expression) {
    // TODO: implement visitSetExpression
    throw UnimplementedError();
  }

  @override
  String visitThisExpression(ThisExpression expression) {
    // TODO: implement visitThisExpression
    throw UnimplementedError();
  }

  @override
  String visitSuperExpression(SuperExpression expression) {
    // TODO: implement visitSuperExpression
    throw UnimplementedError();
  }
}
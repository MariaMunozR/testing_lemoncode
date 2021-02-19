import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import { mapProjectFromApiToVm } from './project.mapper';

/*
1)devolver proyecto vacio si valor undef
2)devolver proyecto vacio si valor null
3)funcionar aunque se añadan porp opcionales
4)funcionar pero poner null employee
5)funcionar pero poner undef employee 
*/

describe('./pods/project/ject.mapper', () => {
  it('should return empty project when undefined value', () => {
    //Arrange

    const project = undefined;

    //Act
    const result = mapProjectFromApiToVm(project);

    //Assert

    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should return empty project when null value', () => {
    //Arrange

    const project = null;

    //Act

    const result = mapProjectFromApiToVm(project);

    //Assert

    expect(result).toEqual(viewModel.createEmptyProject());
  });

  it('should work when some of the recieve optional properties in "employees" are not included in AppiData', () => {
    //Arrange
    const apiData: apiModel.Project = {
      id: '01',
      name: 'TestName',
      isActive: true,
      comments: 'ComentariodePrueba',
      externalId: 'TestID',
      employees: [{ id: '02', employeeName: 'TestName2' }],
    };

    //Act
    const result: viewModel.Project = mapProjectFromApiToVm(apiData);

    //Assert
    expect(result).toEqual<viewModel.Project>({
      id: '01',
      name: 'TestName',
      isActive: true,
      comments: 'ComentariodePrueba',
      externalId: 'TestID',
      employees: [{ id: '02', employeeName: 'TestName2' }],
    });

    it('should return expected result, but null employee list', () => {
      //Arrange
      const project: apiModel.Project = {
        id: '01',
        name: 'TestName',
        isActive: true,
        comments: 'ComentariodePrueba',
        externalId: 'TestID',
        employees: null,
      };

      const expectedResult: viewModel.Project = {
        id: '01',
        name: 'TestName',
        isActive: true,
        comments: 'ComentariodePrueba',
        externalId: 'TestID',
        employees: [],
      };
      //Act

      const result = mapProjectFromApiToVm(project);

      //Assert

      expect(result).toEqual(expectedResult);
    });

    it('should return expected result, but undefined employee list', () => {
      //Arrange
      const project: apiModel.Project = {
        id: '01',
        name: 'TestName',
        isActive: true,
        comments: 'ComentariodePrueba',
        externalId: 'TestID',
        employees: undefined,
      };

      const expectedResult: viewModel.Project = {
        id: '01',
        name: 'TestName',
        isActive: true,
        comments: 'ComentariodePrueba',
        externalId: 'TestID',
        employees: [],
      };

      //Act

      const result = mapProjectFromApiToVm(project);

      //Assert

      expect(result).toEqual(expectedResult);
    });
  });
});
